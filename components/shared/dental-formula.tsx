"use client";

import React from "react";
import TeethDiagram from "./teeth-form";
import { Button } from "@/components/ui/button";
import { ToothData } from "./create-view";

interface DentalFormulaProps {
  handleTeethDataChange: (newData: ToothData[]) => void; // Теперь это массив зубов
  teethData: ToothData[]; // Массив зубов
}

export const DentalFormula: React.FC<DentalFormulaProps> = ({
  handleTeethDataChange,
  teethData,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-center text-lg font-bold mb-4">
        Fill-in Your patient’s dental formula
      </h2>

      {/* Диаграмма зубов */}
      <TeethDiagram
        mode="diagnosis"
        teethData={teethData}
        onTeethDataChange={handleTeethDataChange}
      />

      <div className="flex justify-center gap-4 mt-6">
        {/* <Button variant="outline" className="px-6 py-2">
          Save dental formula
        </Button> */}
      </div>
    </div>
  );
};

export default DentalFormula;
