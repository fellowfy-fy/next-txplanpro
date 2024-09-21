import { useRef, useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import api from "../api/api";
import usePhotoUpload from "../hooks/usePhotoUpload";

const PatientReport = ({ patient }) => {
  const contentRef = useRef();
  const { auth, setAuth } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [staticText, setStaticText] = useState(auth.static_text);

  const {
    previews: clinicPreviews,
    handleFileChange: handleClinicFileChange,
    handleUpload: handleClinicUpload,
  } = usePhotoUpload("clinic");

  const {
    previews: patientPreviews,
    handleFileChange: handlePatientFileChange,
    handleUpload: handlePatientUpload,
  } = usePhotoUpload("patient", patient);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      const data = {
        auth: {
          static_text: auth.static_text,
          clinic_photos: auth.clinic_photos,
        },
        patient: {
          name: patient?.name,
          photos: patient?.photos,
          formatted_treatment_plan: formattedTreatmentPlan,
        },
        financial_plan: financialPlan,
        total: total,
      };

      const response = await api.post("/generate-pdf/", data, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "patient_report.pdf";
      link.click();
      setIsDownloading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
    }
  };

  const formatTreatmentPlan = (treatmentPlan) => {
    const formattedPlan = {};
    for (const [tooth, treatment] of Object.entries(treatmentPlan)) {
      if (treatment !== "default") {
        if (!formattedPlan[treatment]) {
          formattedPlan[treatment] = [];
        }
        formattedPlan[treatment].push(tooth);
      }
    }
    return formattedPlan;
  };

  const formattedTreatmentPlan = patient?.treatment_plan
    ? formatTreatmentPlan(patient.treatment_plan)
    : {};

  const calculateFinancialPlan = (formattedPlan, prices) => {
    const financialPlan = {};
    let total = 0;
    for (const [treatment, teeth] of Object.entries(formattedPlan)) {
      const price = prices[treatment] || 0;
      const cost = price * teeth.length;
      financialPlan[treatment] = { count: teeth.length, cost };
      total += cost;
    }
    return { financialPlan, total };
  };

  const { financialPlan, total } = calculateFinancialPlan(
    formattedTreatmentPlan,
    auth.prices
  );

  const getClinicPhotoUrl = (name) => {
    const photo = auth.clinic_photos.find((p) => p.photo.includes(name));
    return photo ? photo.photo : null;
  };

  const handleClinicFileInputChange = async (e) => {
    const { name, files: inputFiles } = e.target;
    await handleClinicFileChange(e);
    await handleClinicUpload({ name, file: inputFiles[0] });
  };

  const handlePatientFileInputChange = async (e) => {
    const { name, files: inputFiles } = e.target;
    await handlePatientFileChange(e);
    await handlePatientUpload({ name, file: inputFiles[0] });
  };

  const handleStaticTextChange = (e) => {
    const { name, value } = e.target;
    setStaticText((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveStaticText = async (fieldName) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await api.put(
        "/doctors/update/",
        { static_text: staticText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAuth((prevAuth) => ({
        ...prevAuth,
        static_text: staticText,
      }));
      setEditingField(null);
      console.log("Static text updated:", response.data);
    } catch (error) {
      console.error("Error updating static text:", error);
      alert("Failed to update static text.");
    }
  };

  const handleClick = (fieldName) => {
    setEditingField(fieldName);
  };

  useEffect(() => {
    setStaticText(auth.static_text);
  }, [auth.static_text]);

  return (
    <div className="w-full">
      <button
        onClick={handleDownload}
        className="mt-3 border border-black rounded-lg p-3"
        disabled={isDownloading}
      >
        {isDownloading ? "Downloading..." : "Download PDF"}
      </button>
      <div className="relative">
        <div ref={contentRef}>
          {/* First Slide */}
          <div className="relative w-full h-[9in]">
            <img
              src={clinicPreviews["intro"] || getClinicPhotoUrl("intro")}
              alt="Intro Photo"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              id={`file-input-intro`}
              name="intro"
              onChange={handleClinicFileInputChange}
              className="hidden"
            />
            <label
              htmlFor={`file-input-intro`}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            {auth?.static_text?.slide1 && (
              <div className="absolute top-[350px] left-12 text-white p-2">
                {editingField === "slide1" ? (
                  <input
                    type="text"
                    name="slide1"
                    value={staticText.slide1}
                    onChange={handleStaticTextChange}
                    onBlur={() => handleSaveStaticText("slide1")}
                    className="bg-transparent text-white text-6xl lg:text-4xl border border-white rounded-3xl p-3 font-normal"
                    autoFocus
                  />
                ) : (
                  <div
                    className="bg-transparent text-white text-6xl lg:text-4xl border border-white rounded-3xl p-3 font-normal cursor-pointer"
                    onClick={() => handleClick("slide1")}
                  >
                    {auth.static_text.slide1}
                  </div>
                )}
                <div className="font-light text-4xl lg:text-2xl">
                  Patient: <span className="font-bold">{patient?.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Second Slide */}
          <div className="relative w-full h-[9in]">
            <img
              src={clinicPreviews["vision"] || getClinicPhotoUrl("vision")}
              alt="Vision Photo"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              id={`file-input-vision`}
              name="vision"
              onChange={handleClinicFileInputChange}
              className="hidden"
            />
            <label
              htmlFor={`file-input-vision`}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            {auth?.static_text?.slide2 && (
              <div className="absolute top-[200px] left-[120px] text-white p-2">
                {editingField === "slide2" ? (
                  <input
                    type="text"
                    name="slide2"
                    value={staticText.slide2}
                    onChange={handleStaticTextChange}
                    onBlur={() => handleSaveStaticText("slide2")}
                    className="bg-transparent text-white text-6xl lg:text-4xl border border-white rounded-3xl p-3 font-normal"
                    autoFocus
                  />
                ) : (
                  <div
                    className="bg-transparent text-white text-6xl lg:text-4xl border border-white rounded-3xl p-3 font-normal cursor-pointer"
                    onClick={() => handleClick("slide2")}
                  >
                    {auth.static_text.slide2}
                  </div>
                )}
              </div>
            )}
            {auth?.static_text?.slide3 && (
              <div className="absolute top-[500px] right-[120px] text-white p-2">
                {editingField === "slide3" ? (
                  <input
                    type="text"
                    name="slide3"
                    value={staticText.slide3}
                    onChange={handleStaticTextChange}
                    onBlur={() => handleSaveStaticText("slide3")}
                    className="bg-transparent text-white text-2xl lg:text-xl border border-white rounded-3xl p-3 font-normal"
                    autoFocus
                  />
                ) : (
                  <div
                    className="bg-transparent text-white text-2xl lg:text-xl border border-white rounded-3xl p-3 font-normal cursor-pointer"
                    onClick={() => handleClick("slide3")}
                  >
                    {auth.static_text.slide3}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Third Slide */}
          <div className="relative w-full h-[9in] text-center font-extralight text-5xl lg:text-3xl">
            <h1 className="p-5">Diagnosis Visualisation</h1>
            <div className="flex">
              <div className="relative w-1/2">
                <h2 className="p-5">Upper jaw</h2>
                <div>
                  <img
                    src={
                      patientPreviews["upper_occlusal"] ||
                      patient.photos.find((p) =>
                        p.photo.includes("upper_occlusal")
                      )?.photo
                    }
                    alt="Upper Occlusal Photo"
                    className="w-full h-full object-cover p-10"
                  />
                  <input
                    type="file"
                    id={`file-input-upper_occlusal`}
                    name="upper_occlusal"
                    onChange={handlePatientFileInputChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-input-upper_occlusal`}
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
                  >
                    <FaCamera />
                  </label>
                </div>
              </div>
              <div className="relative w-1/2">
                <div>
                  <h2 className="p-5">Lower jaw</h2>
                  <img
                    src={
                      patientPreviews["lower_occlusal"] ||
                      patient.photos.find((p) =>
                        p.photo.includes("lower_occlusal")
                      )?.photo
                    }
                    alt="Lower Occlusal Photo"
                    className="w-full h-full object-cover p-10"
                  />
                  <input
                    type="file"
                    id={`file-input-lower_occlusal`}
                    name="lower_occlusal"
                    onChange={handlePatientFileInputChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-input-lower_occlusal`}
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
                  >
                    <FaCamera />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Slide */}
          <div className="relative w-full h-[9in] text-center font-extralight text-5xl lg:text-3xl">
            <h1 className="p-5">Diagnosis Visualisation</h1>
            <div className="flex">
              <div className="relative w-1/2">
                <h2 className="p-5">Left side</h2>
                <div>
                  <img
                    src={
                      patientPreviews["side_left"] ||
                      patient.photos.find((p) => p.photo.includes("side_left"))
                        ?.photo
                    }
                    alt="Side Left Photo"
                    className="w-full h-full object-cover p-10"
                  />
                  <input
                    type="file"
                    id={`file-input-side_left`}
                    name="side_left"
                    onChange={handlePatientFileInputChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-input-side_left`}
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
                  >
                    <FaCamera />
                  </label>
                </div>
              </div>
              <div className="relative w-1/2">
                <h2 className="p-5">Right side</h2>
                <div>
                  <img
                    src={
                      patientPreviews["side_right"] ||
                      patient.photos.find((p) => p.photo.includes("side_right"))
                        ?.photo
                    }
                    alt="Side Right Photo"
                    className="w-full h-full object-cover p-10"
                  />
                  <input
                    type="file"
                    id={`file-input-side_right`}
                    name="side_right"
                    onChange={handlePatientFileInputChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-input-side_right`}
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
                  >
                    <FaCamera />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Fifth Slide */}
          <div className="relative w-full h-[9in]">
            <img
              src={clinicPreviews["break"] || getClinicPhotoUrl("break")}
              alt="Break Photo"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              id={`file-input-break`}
              name="break"
              onChange={handleClinicFileInputChange}
              className="hidden"
            />
            <label
              htmlFor={`file-input-break`}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            {auth?.static_text?.slide4 && (
              <div className="absolute top-[200px] right-12 text-white p-2">
                {editingField === "slide4" ? (
                  <input
                    type="text"
                    name="slide4"
                    value={staticText.slide4}
                    onChange={handleStaticTextChange}
                    onBlur={() => handleSaveStaticText("slide4")}
                    className="bg-transparent text-white text-2xl lg:text-xl border border-white rounded-3xl p-3 font-normal"
                    autoFocus
                  />
                ) : (
                  <div
                    className="bg-transparent text-white text-2xl lg:text-xl border border-white rounded-3xl p-3 font-normal cursor-pointer"
                    onClick={() => handleClick("slide4")}
                  >
                    {auth.static_text.slide4}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sixth Slide */}
          <div className="relative w-full h-[9in] text-center items-center">
            <img
              src={
                patientPreviews["panoramic_xray"] ||
                patient.photos.find((p) => p.photo.includes("panoramic_xray"))
                  ?.photo
              }
              alt="Panoramic X-Ray Photo"
              className="w-full h-[4in] object-cover"
            />
            <input
              type="file"
              id={`file-input-panoramic_xray`}
              name="panoramic_xray"
              onChange={handlePatientFileInputChange}
              className="hidden"
            />
            <label
              htmlFor={`file-input-panoramic_xray`}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            <div>
              {auth?.static_text?.slide5 && (
                <div className="flex text-black">
                  <div className="w-1/3">
                    <div className="text-3xl lg:text-2xl font-semibold py-5">
                      Surgical & Implant Treatment
                    </div>
                    <div className="text-xl lg:text-lg font-extralight rounded-3xl">
                      {editingField === "slide5" ? (
                        <input
                          type="text"
                          name="slide5"
                          value={staticText.slide5}
                          onChange={handleStaticTextChange}
                          onBlur={() => handleSaveStaticText("slide5")}
                          className="bg-transparent text-xl lg:text-lg font-extralight rounded-3xl"
                          autoFocus
                        />
                      ) : (
                        <div
                          className="bg-transparent text-xl lg:text-lg font-extralight rounded-3xl cursor-pointer"
                          onClick={() => handleClick("slide5")}
                        >
                          {auth.static_text.slide5}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="text-3xl lg:text-2xl font-semibold py-5">
                      Procedures
                    </div>
                    <div className="text-xl lg:text-lg font-extralight rounded-3xl">
                      {Object.entries(formattedTreatmentPlan).map(
                        ([treatment, teeth]) => (
                          <div key={treatment}>
                            <strong>
                              {treatment} [{teeth.length}]
                            </strong>
                            : {teeth.join(", ")}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="text-3xl lg:text-2xl font-semibold py-5">
                      Financial Plan
                    </div>
                    <div className="text-xl lg:text-lg font-extralight rounded-3xl">
                      {Object.entries(financialPlan).map(
                        ([treatment, { count, cost }]) => (
                          <div key={treatment}>
                            {treatment} [{count}] : ${cost}
                          </div>
                        )
                      )}
                      <strong>Total: ${total}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReport;
