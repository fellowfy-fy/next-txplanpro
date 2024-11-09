"use client";

import React from "react";
import TeethDiagram from "./teeth-form";
import { ToothData } from "./create-plan-form";

interface TreatmentPlanProps {
  handleTeethDataChange: (newData: ToothData[]) => void;
  teethData: ToothData[];
}

export const TreatmentPlan: React.FC<TreatmentPlanProps> = ({
  handleTeethDataChange,
  teethData,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-center text-lg font-bold mb-4">
        Define Your Patient’s Treatment Plan
      </h2>

      <TeethDiagram
        mode="treatment" 
        teethData={teethData} 
        onTeethDataChange={handleTeethDataChange} 
      />
    </div>
  );
};

export default TreatmentPlan;
