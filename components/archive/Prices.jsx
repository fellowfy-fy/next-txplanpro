import { useState, useEffect } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

const Prices = () => {
  const { auth } = useAuth();
  const initialState = {
    "Gingival graft": auth.prices?.["Gingival graft"] || "",
    "New Implant": auth.prices?.["New Implant"] || "",
    Extraction: auth.prices?.["Extraction"] || "",
    "Sinus-lifting": auth.prices?.["Sinus-lifting"] || "",
    GBR: auth.prices?.["GBR"] || "",
    "Surgical tooth lengthening":
      auth.prices?.["Surgical tooth lengthening"] || "",
    "Recession closure": auth.prices?.["Recession closure"] || "",
  };

  const [prices, setPrices] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrices(initialState);
  }, [auth.prices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrices((prev) => ({
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
        { prices },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Prices updated:", response.data);
      alert("Prices updated successfully!");
    } catch (error) {
      console.error("Error updating prices:", error);
      alert("Failed to update prices.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Update Treatment Prices</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(initialState).map((treatment, index) => (
          <div key={index} className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor={treatment}
            >
              {treatment}
            </label>
            <input
              type="number"
              id={treatment}
              name={treatment}
              value={prices[treatment]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              min="0"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Prices"}
        </button>
      </form>
    </div>
  );
};

export default Prices;
