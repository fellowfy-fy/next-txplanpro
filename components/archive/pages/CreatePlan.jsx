import { useState, useEffect } from "react";
import api from "../api/api";
import PatientForm from "../components/PatientForm";
import PatientSelect from "../components/PatientSelect";
import TabNavigation from "../components/TabNavigation";
import AltDentalFormula from "../components/AltDentalFormula";
import Guidelines from "../components/Guidelines";
import Photos from "../components/Photos";
import TreatmentPlan from "../components/TreatmentPlan";
import ErrorMessage from "../components/ErrorMessage";

const CreatePlan = () => {
  const [activeTab, setActiveTab] = useState("1 - Dental formula");
  const [initialStatus, setInitialStatus] = useState({});
  const [desiredStatus, setDesiredStatus] = useState({});
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [dentalFormula, setAltDentalFormula] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [IDPatient, setIDPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await api.get("/patients/get/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Error fetching patients. Please try again later.");
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (currentPatient) {
      setPhotos(currentPatient.photos);
      setInitialStatus(currentPatient.teeth_status || {});
      setDesiredStatus(currentPatient.treatment_plan || {});
      setPatientName(currentPatient.name || "Unknown");
      setIDPatient(currentPatient.id || null);
    }
  }, [currentPatient]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleToothStatusChange = (id, status, step) => {
    console.log(`Tooth ${id} status changed to ${status} at step ${step}`);
    if (step === 1) {
      setInitialStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
    } else if (step === 4) {
      setDesiredStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
    }
    setAltDentalFormula((prevFormula) => ({ ...prevFormula, [id]: status }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await api.post(
        "/patients/",
        {
          name: patientName,
          diagnosis,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Patient saved:", response.data);
      setPatients((prevPatients) => [...prevPatients, response.data]);
      setCurrentPatient(response.data);
    } catch (error) {
      console.error("Error saving patient:", error);
      setError("Error saving patient. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (!currentPatient) {
      console.error("No patient selected");
      setError("No patient selected.");
      return;
    }
    const token = localStorage.getItem("access_token");
    try {
      const response = await api.put(
        `/patients/${currentPatient.id}/update/`,
        {
          name: patientName,
          diagnosis: diagnosis,
          teeth_status: initialStatus,
          treatment_plan: desiredStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Dental formula updated:", response.data);
    } catch (error) {
      console.error("Error updating dental formula:", error);
      setError("Error updating dental formula. Please try again.");
    }
  };

  const handlePatientChange = (event) => {
    const patientId = event.target.value;
    if (patientId) {
      const selectedPatient = patients.find(
        (patient) => patient.id === parseInt(patientId)
      );
      setCurrentPatient(selectedPatient);
      setPatientName(selectedPatient.name);
      setDiagnosis(selectedPatient.diagnosis);
      setInitialStatus(selectedPatient.teeth_status || {});
      setDesiredStatus(selectedPatient.treatment_plan || {});
      setPhotos(selectedPatient.photos || []);
    } else {
      setCurrentPatient(null);
      setPatientName("");
      setDiagnosis("");
      setInitialStatus({});
      setDesiredStatus({});
      setPhotos([]);
    }
  };

  const handleFileUpload = async () => {
    if (!currentPatient) {
      console.error("No patient selected for file upload");
      setError("No patient selected for file upload.");
      return;
    }

    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("patient_id", currentPatient.id);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("photos", selectedFiles[i]);
    }

    try {
      const response = await api.post("/patient/upload_photos/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Files uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
      setError("Error uploading files. Please try again.");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="bg-white rounded-3xl p-8">
        {/* <h1 className="text-xl font-medium mb-4">
          Create a new complex or local segment treatment plan for Your patient
          <button className="ml-4 py-1 px-4 text-base rounded-2xl border border-neutral-300">
            Add patient
          </button>
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Find a patient or plan..."
            className="w-full p-2 text-xs bg-white active:text-gray-200 px-4 text-gray-400 rounded-full hover:text-gray-500 border border-gray-900"
          />
        </div> */}
        <PatientSelect
          patients={patients}
          handlePatientChange={handlePatientChange}
          currentPatient={currentPatient}
        />
        {currentPatient ? (
          <div className="bg-stone-100 rounded-2xl p-4 mt-6 ">
            <TabNavigation
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
            {activeTab === "1 - Dental formula" && (
              <AltDentalFormula
                handleToothStatusChange={handleToothStatusChange}
                handleUpdate={handleUpdate}
                initialStatus={initialStatus}
                handleTabChange={handleTabChange}
              />
            )}
            {activeTab === "2 - Guidelines" && (
              <Guidelines handleTabChange={handleTabChange} />
            )}
            {activeTab === "3 - Photos" && (
              <Photos
                photos={photos}
                handleFileUpload={handleFileUpload}
                handleTabChange={handleTabChange}
              />
            )}
            {activeTab === "4 - TreatmentPlan" && (
              <TreatmentPlan
                handleToothStatusChange={handleToothStatusChange}
                desiredStatus={desiredStatus}
                handleUpdate={handleUpdate}
                patientId={IDPatient}
              />
            )}
          </div>
        ) : (
          <>
            <div>
              <PatientForm
                patientName={patientName}
                setPatientName={setPatientName}
                diagnosis={diagnosis}
                setDiagnosis={setDiagnosis}
                handleSave={handleSave}
              />
            </div>
          </>
        )}
      </div>
      <div style={{ display: "none" }}></div>
    </div>
  );
};

export default CreatePlan;
