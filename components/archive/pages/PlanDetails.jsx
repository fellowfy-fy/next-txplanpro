import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ScribbleCanvas from "./ScribbleCanvas";
import api from "../api/api";
import PatientReport from "../components/PatientReport";

const titles = [
  "Upper Occlusal",
  "Lower Occlusal",
  "Left Side",
  "Right Side",
  "Panoramic X-ray",
];

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [editingPhotoUrl, setEditingPhotoUrl] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [editingPhotoId, setEditingPhotoId] = useState(null);
  const [showReport, setShowReport] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await api.get(`/patients/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const handleEditPhotoClick = (url, photoId) => {
    setEditingPhotoUrl(url);
    setEditingPhotoId(photoId);
  };

  const handleSave = async () => {
    if (!imageData) return;
    const fileName = editingPhotoUrl.split("/").pop();

    const blob = await (await fetch(imageData)).blob();
    const formData = new FormData();
    formData.append("photo", blob, fileName);

    try {
      const token = localStorage.getItem("access_token");
      await api.put(`/patient_photo/${editingPhotoId}/update/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Image saved successfully!");
      setEditingPhotoUrl(null);
      setEditingPhotoId(null);
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Error saving image!");
    }
  };

  const handleClose = () => {
    setEditingPhotoUrl(null);
    setEditingPhotoId(null);
  };

  const handleDownloadClick = () => {
    setShowReport(true);
  };

  return (
    <div className="ml-10 bg-white rounded-3xl w-[95%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline p-[24px]"
      >
        &lt; Back to Plans
      </button>
      {!showReport && (
        <div className="flex flex-col md:flex-row p-[24px]">
          <div className="flex-1 mb-4 md:mb-0">
            <p>Click on the photo to edit</p>
            {patient.photos.map((photo, index) => (
              <div key={index}>
                <h1 className="text-2xl font-bold text-center">
                  {titles[index]}
                </h1>
                <img
                  src={photo.photo}
                  alt={`Photo ${index}`}
                  className="w-full h-auto mt-2"
                  onClick={() => handleEditPhotoClick(photo.photo, photo.id)}
                />
              </div>
            ))}
          </div>
          <div className="flex-1 md:ml-4">
            <h1 className="text-2xl font-bold mb-2">Patient: {patient.name}</h1>
            <p className="text-gray-700 mb-4">Diagnosis: {patient.diagnosis}</p>
            <button
              className="bg-black text-white py-2 px-4 rounded w-full mb-2"
              onClick={handleDownloadClick}
            >
              Download/Send
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
              Edit Plan
            </button>
          </div>
        </div>
      )}
      {editingPhotoUrl && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <div className="flex justify-between">
              <button
                onClick={handleClose}
                className="mb-4 text-red-500 hover:underline"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="mb-4 text-green-500 hover:underline"
              >
                Save
              </button>
            </div>
            <ScribbleCanvas
              imageUrl={editingPhotoUrl}
              setImageData={setImageData}
            />
          </div>
        </div>
      )}
      {showReport && <PatientReport patient={patient} />}
    </div>
  );
};

export default PlanDetails;
