import { useState, useEffect } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

const StaticText = () => {
  const { auth, setAuth } = useAuth(); // Destructure setAuth from useAuth
  const initialState = {
    slide1: auth.static_text?.slide1 || "",
    slide2: auth.static_text?.slide2 || "",
    slide3: auth.static_text?.slide3 || "",
    slide4: auth.static_text?.slide4 || "",
    slide5: auth.static_text?.slide5 || "",
  };
  const [staticText, setStaticText] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaticText((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      console.log("Static text updated:", response.data);
      // Update the auth context with the new static text
      setAuth((prevAuth) => ({
        ...prevAuth,
        static_text: staticText,
      }));
    } catch (error) {
      console.error("Error updating static text:", error);
      alert("Failed to update static text.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStaticText(initialState);
  }, [auth.static_text]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Static Text</h1>
      <form onSubmit={handleSubmit}>
        {[...Array(5).keys()].map((index) => (
          <div key={index} className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor={`slide${index + 1}`}
            >
              Slide {index + 1}
            </label>
            <textarea
              type="text"
              id={`slide${index + 1}`}
              name={`slide${index + 1}`}
              value={staticText[`slide${index + 1}`]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Static Text"}
        </button>
      </form>
    </div>
  );
};

export default StaticText;
