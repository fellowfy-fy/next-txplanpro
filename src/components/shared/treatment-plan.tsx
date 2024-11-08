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

      {/* Диаграмма зубов для плана лечения */}
      <TeethDiagram
        mode="treatment" // Используем режим для лечения
        teethData={teethData} // Передаем данные зубов
        onTeethDataChange={handleTeethDataChange} // Обновляем данные о лечении зубов
      />
    </div>
  );
};

export default TreatmentPlan;
