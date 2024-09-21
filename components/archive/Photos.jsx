import { useState, useEffect } from "react";
import api from "../api/api";

const Photos = ({ photos, handleFileUpload, handleTabChange }) => {
  const [selectedFiles, setSelectedFiles] = useState({
    upper_occlusal: null,
    lower_occlusal: null,
    side_left: null,
    side_right: null,
    panoramic_xray: null,
  });
  const [previews, setPreviews] = useState({
    upper_occlusal: null,
    lower_occlusal: null,
    side_left: null,
    side_right: null,
    panoramic_xray: null,
  });

  const handleNext = () => {
    handleTabChange("4 - TreatmentPlan");
  };

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      setSelectedFiles((prev) => ({
        ...prev,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (field, editingPhotoId) => {
    const formData = new FormData();
    if (selectedFiles[field]) {
      const originalFile = selectedFiles[field];
      const renamedFile = new File(
        [originalFile],
        `${field}-${editingPhotoId}.png`,
        { type: originalFile.type }
      );

      formData.append("photo", renamedFile);

      try {
        const token = localStorage.getItem("access_token");
        await api.put(`/patient_photo/${editingPhotoId}/update/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert(`${field} uploaded successfully!`);
      } catch (error) {
        console.error(`Error uploading ${field}:`, error);
        alert(`Failed to upload ${field}.`);
      }
    }
  };

  const getPhotoUrl = (name) => {
    const photo = photos.find((p) => p.photo.includes(name));
    return photo ? photo.photo : null;
  };

  const getPhotoId = (name) => {
    const photo = photos.find((p) => p.photo.includes(name));
    return photo ? photo.id : null;
  };

  useEffect(() => {
    setPreviews({
      upper_occlusal: getPhotoUrl("upper_occlusal"),
      lower_occlusal: getPhotoUrl("lower_occlusal"),
      side_left: getPhotoUrl("side_left"),
      side_right: getPhotoUrl("side_right"),
      panoramic_xray: getPhotoUrl("panoramic_xray"),
    });
  }, [photos]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4">Photos</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Add all your patient's photos and x-rays* to be used in a treatment
            plan presentation.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          *- for the best result upload a minimum of 1 panoramic x-ray, 6
          intraoral and 2 portrait photos. Check "Help" section for guidelines
          on how to make those photos fast, easy and accurate.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "upper_occlusal", label: "Upper Occlusal" },
            { name: "lower_occlusal", label: "Lower Occlusal" },
            { name: "side_left", label: "Side Left" },
            { name: "side_right", label: "Side Right" },
            { name: "panoramic_xray", label: "Panoramic X-ray" },
          ].map(({ name, label }) => {
            const editingPhotoId = getPhotoId(name);
            return (
              <div
                key={name}
                className={`flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center ${
                  name === "panoramic_xray" ? "col-span-2" : ""
                }`}
              >
                <input
                  type="file"
                  id={name}
                  name={name}
                  onChange={handleInputChange}
                  style={{ display: "none" }}
                />
                {previews[name] ? (
                  <img
                    src={previews[name]}
                    alt={`${name} preview`}
                    className="mt-2 w-full h-40 object-cover rounded-lg shadow-md cursor-pointer"
                    onClick={() => document.getElementById(name).click()}
                  />
                ) : (
                  <div
                    className="mt-2 w-full h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md cursor-pointer"
                    onClick={() => document.getElementById(name).click()}
                  >
                    Click to add {label}
                  </div>
                )}
                <button
                  className="mt-4 py-2 px-4 rounded-lg bg-gray-700 text-white hover:bg-gray-600 w-full"
                  onClick={() => handleUpload(name, editingPhotoId)}
                  disabled={!editingPhotoId}
                >
                  Upload {label}
                </button>
              </div>
            );
          })}
          <button
            onClick={handleNext}
            className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photos;
