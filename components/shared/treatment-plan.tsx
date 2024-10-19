"use client";

import React from "react";
import TeethDiagram from "./teeth-form";
import { Button } from "@/components/ui/button";
import { ToothData } from "./create-view";

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

      {/* Кнопка сохранения */}
      <div className="flex justify-center gap-4 mt-6">
        {/* <Button variant="outline" className="px-6 py-2">
          Save Treatment Plan
        </Button> */}
      </div>
    </div>
  );
};

export default TreatmentPlan;
