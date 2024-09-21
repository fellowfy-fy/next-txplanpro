import React, { useEffect, useState } from "react";
import Tile from "../components/Tile";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

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
      }
    };

    fetchPatients();
  }, []);

  const handleClick = (id) => {
    navigate(`/txplan/${id}`);
  };

  return (
    <div className="ml-10 bg-white rounded-3xl w-[95%]">
      <div className="p-[24px]">
        <h1 className="text-5xl font-medium mb-4">Welcome to TxPlanPro</h1>
        <h1 className="font-medium text-gray-500 opacity-80 mb-4">
          Create fast, professional and visual appealing Dental Treatment Plans
          online
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <Tile
              key={patient.id}
              title={`Patient: ${patient.name}`}
              description={`Details about ${patient.name}'s treatment plan`}
              onClick={() => handleClick(patient.id)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          {/* <button
            className="bg-black text-white py-2 px-4 rounded"
            onClick={() => navigate("/all-plans")}
          >
            View All Plans
          </button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6 ">
          <button
            className="border rounded-lg p-4 hover:bg-gray-100 transition"
            onClick={() => navigate("/create")}
          >
            <h2 className="text-lg font-bold">CREATE NEW TxPlan</h2>
            <p className="text-gray-600">
              Create a treatment plan for a new or existing patient (mostly for
              local cases)
            </p>
          </button>
          {/* <button
            className="border rounded-lg p-4 hover:bg-gray-100 transition"
            onClick={() => navigate("/create")}
          >
            <h2 className="text-lg font-bold">
              CREATE NEW Digital Smile Design project
            </h2>
            <p className="text-gray-600">
              Start a new plan from a DSD project (mostly for complex cases)
            </p>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
