import { useState } from "react";
import TeethArch from "./TeethArch";
import jaws from "../assets/jaws.svg";
import tooth11 from "../assets/teeth/tooth11.svg";
import tooth12 from "../assets/teeth/tooth12.svg";
import tooth13 from "../assets/teeth/tooth13.svg";
import tooth14 from "../assets/teeth/tooth14.svg";
import tooth15 from "../assets/teeth/tooth15.svg";
import tooth16 from "../assets/teeth/tooth16.svg";
import tooth17 from "../assets/teeth/tooth17.svg";
import tooth18 from "../assets/teeth/tooth18.svg";
import tooth41 from "../assets/teeth/tooth41.svg";
import tooth42 from "../assets/teeth/tooth42.svg";
import tooth43 from "../assets/teeth/tooth43.svg";
import tooth44 from "../assets/teeth/tooth44.svg";
import tooth45 from "../assets/teeth/tooth45.svg";
import tooth46 from "../assets/teeth/tooth46.svg";
import tooth47 from "../assets/teeth/tooth47.svg";
import tooth48 from "../assets/teeth/tooth48.svg";
import { useNavigate } from "react-router-dom";

// Export tooth images
export const toothImages = {
  // Upper right
  8: { default: tooth11 },
  7: { default: tooth12 },
  6: { default: tooth13 },
  5: { default: tooth14 },
  4: { default: tooth15 },
  3: { default: tooth16 },
  2: { default: tooth17 },
  1: { default: tooth18 },

  // Upper left
  9: { default: tooth11 },
  10: { default: tooth12 },
  11: { default: tooth13 },
  12: { default: tooth14 },
  13: { default: tooth15 },
  14: { default: tooth16 },
  15: { default: tooth17 },
  16: { default: tooth18 },

  // Lower right
  24: { default: tooth41 },
  23: { default: tooth42 },
  22: { default: tooth43 },
  21: { default: tooth44 },
  20: { default: tooth45 },
  19: { default: tooth46 },
  18: { default: tooth47 },
  17: { default: tooth48 },

  // Lower left
  25: { default: tooth41 },
  26: { default: tooth42 },
  27: { default: tooth43 },
  28: { default: tooth44 },
  29: { default: tooth45 },
  30: { default: tooth46 },
  31: { default: tooth47 },
  32: { default: tooth48 },
};

const statusToBorderColor = {
  default: "border-transparent",
  Extraction: "border-[#6a1a48]",
  "New Implant": "border-[#ed8ea0]",
  "Gingival graft": "border-[#c6cd85]",
  GBR: "border-[#138c48]",
  "Surgical tooth lengthening": "border-[#eb19e2]",
  "Recession closure": "border-[#503e4f]",
  "Sinus-lifting": "border-[#a5b787]",
};

const TreatmentPlan = ({
  handleToothStatusChange,
  handleUpdate,
  desiredStatus,
  patientId,
}) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("default");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const navigateToPDF = () => {
    navigate(`/txplan/${patientId}/`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4">Treatment Plan</h2>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4 mb-4 lg:mb-0">
          <div className="flex flex-col">
            {[
              "Extraction",
              "New Implant",
              "Gingival graft",
              "GBR",
              "Surgical tooth lengthening",
              "Recession closure",
              "Sinus-lifting",
              "default",
            ].map((text, index) => (
              <button
                key={index}
                className={`w-full py-2 px-4 rounded bg-white hover:bg-gray-100 border-[4px] ${
                  selectedStatus === text
                    ? statusToBorderColor[text]
                    : "border-gray-300"
                }`}
                onClick={() => handleStatusChange(text)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-[350px] h-[400px] mx-[20px] ">
          <img
            className="w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={jaws}
            alt="Jaws"
          />
          <div className="absolute top-0 left-0 right-0">
            <TeethArch
              start={1}
              end={16}
              initialStatus={desiredStatus}
              isUpper={true}
              handleToothStatusChange={handleToothStatusChange}
              step={4}
              selectedStatus={selectedStatus}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <TeethArch
              start={17}
              end={32}
              initialStatus={desiredStatus}
              isUpper={false}
              handleToothStatusChange={handleToothStatusChange}
              step={4}
              selectedStatus={selectedStatus}
            />
          </div>
        </div>
        <div className="lg:w-3/4 p-4 rounded-xl border border-neutral-300">
          <h2 className="text-lg font-medium mb-4">
            Fill in Your desired treatment for every tooth
          </h2>
          <p className="text-gray-600 mb-4">
            This will make your TxPlanPro presentation the most accurate and
            individualized.
            <br />
            You can also skip this step and get the fully AI-generated plan,
            which you can edit later.
          </p>
          <div className="space-y-2">
            {/* <button className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100">
              Skip and generate
            </button>
            <button className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100">
              AI-based fill-in
            </button>
            <button className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100">
              Generate plan
            </button> */}

            <button
              className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
              onClick={handleUpdate}
            >
              Save Treatment Plan
            </button>
            <button
              className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
              onClick={navigateToPDF}
            >
              Go to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlan;
