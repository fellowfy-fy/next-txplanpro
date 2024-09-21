import { useState, useEffect } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

const ClinicPhotosUpload = () => {
  const { auth, setAuth } = useAuth();
  const [files, setFiles] = useState({
    intro: null,
    vision: null,
    break: null,
  });
  const [previews, setPreviews] = useState({
    intro: null,
    vision: null,
    break: null,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (auth.clinic_photos) {
      setPreviews({
        intro: getPhotoUrl("intro"),
        vision: getPhotoUrl("vision"),
        break: getPhotoUrl("break"),
      });
    }
  }, [auth.clinic_photos]);

  const handleFileChange = (e) => {
    const { name, files: inputFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: inputFiles[0],
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        [name]: reader.result,
      }));
    };
    reader.readAsDataURL(inputFiles[0]);
  };

  const handleUpload = async (name, photoId) => {
    if (!files[name]) return;

    const originalFile = files[name];
    const renamedFile = new File([originalFile], `${name}-${photoId}.jpg`, {
      type: originalFile.type,
    });

    const formData = new FormData();
    formData.append("photo", renamedFile);

    setUploading(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await api.put(
        `/clinic_photo/${photoId}/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAuth((prevAuth) => ({
        ...prevAuth,
        clinic_photos: prevAuth.clinic_photos.map((photo) =>
          photo.id === photoId ? response.data : photo
        ),
      }));
      alert(`${name} photo uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${name} photo:`, error);
      alert(`Failed to upload ${name} photo.`);
    } finally {
      setUploading(false);
    }
  };

  const getPhotoUrl = (name) => {
    const photo = auth.clinic_photos.find((p) => p.photo.includes(name));
    return photo ? photo.photo : null;
  };

  const getPhotoIdByName = (name) => {
    const photo = auth.clinic_photos.find((p) => p.photo.includes(name));
    return photo ? photo.id : null;
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Upload Clinic Photos</h1>
      {["intro", "vision", "break"].map((name) => (
        <div key={name} className="mb-4">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {name.charAt(0).toUpperCase() + name.slice(1)} Photo
          </label>
          <input
            type="file"
            name={name}
            onChange={handleFileChange}
            className="mb-2"
          />
          {previews[name] && (
            <img
              src={previews[name]}
              alt={`${name} preview`}
              className="mt-2 w-full h-full object-cover rounded-lg shadow-md"
            />
          )}
          <button
            onClick={() => handleUpload(name, getPhotoIdByName(name))}
            disabled={uploading || !files[name]}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : `Upload ${name.charAt(0).toUpperCase() + name.slice(1)} Photo`}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ClinicPhotosUpload;
