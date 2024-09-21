import React from "react";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="ml-10 mr-20 bg-white rounded-3xl">
      <div className="p-[24px]">
        <h1 className="text-5xl font-medium mb-4">Patient: Patient's Name</h1>
        <h1 className="font-medium text-gray-500 opacity-80 mb-4">
          Upload patient diagnostic data, create treatment plan or a DSD project
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Find a patient or plan..."
            className="w-full p-2 text-[12px] bg-white active:text-gray-200 block px-4 text-gray-400 rounded-[48px] hover:text-gray-500 border border-gray-900"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Button
            title="Surgical Treatment Plan"
            description="Create fast, professional and visual appealing Dental Treatment Plans online in just several minutes. Increase patient's trust and your clinic's brand identity."
            onClick={() => handleClick("createplan")}
          />
          <Button
            title="Digital Smile Design"
            description="The core of your complex planning"
            // onClick={() => handleClick("digital-smile-design")}
          />
          <Button
            title="Local Treatment Plan"
            description="Fast and easy for ongoing treatments"
            // onClick={() => handleClick("local-treatment-plan")}
          />
          {/* Add more buttons as needed */}
        </div>
      </div>
    </div>
  );
};

export default Create;
