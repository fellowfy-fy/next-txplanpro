"use client";

import React, { useState } from "react";
import Image from "next/image";
import Teeth, { ToothInfo } from "./teeth-import";
import { diagnoses, DiagnosisProps } from "../../constants/diagnoses";
import { TreatmentProps, treatments } from "../../constants/treatments";
import { ToothData } from "./create-view";

interface TeethDiagramProps {
  mode: "diagnosis" | "treatment";
  teethData: ToothData[];
  onTeethDataChange: (updatedTeethData: ToothData[]) => void;
}

const TeethDiagram: React.FC<TeethDiagramProps> = ({
  mode,
  teethData,
  onTeethDataChange,
}) => {
  const { upperTeeth, lowerTeeth } = Teeth;

  const [selectedItem, setSelectedItem] = useState<
    DiagnosisProps | TreatmentProps | null
  >(null);

  // Обработчик выбора элемента (диагноза или лечения)
  const handleItemSelect = (item: DiagnosisProps | TreatmentProps) => {
    setSelectedItem((prev) => (prev?.label === item.label ? null : item));
  };

  // Обработчик клика по зубу
  const handleToothClick = (toothNumber: number) => {
    if (!selectedItem) return;

    const currentTooth = teethData.find(
      (tooth) => tooth.number === toothNumber
    ) || { number: toothNumber, diagnosis: [], treatments: [] }; // Если зуба еще нет, создаем новый объект с пустыми массивами

    let updatedTooth: ToothData = { ...currentTooth };

    if (mode === "diagnosis") {
      // Работаем только с диагнозами
      if (!currentTooth.diagnosis.includes(selectedItem!.label)) {
        const updatedDiagnosis = [
          ...currentTooth.diagnosis,
          selectedItem!.label,
        ];
        updatedTooth = {
          ...currentTooth,
          diagnosis: updatedDiagnosis, // Обновляем диагноз
          treatments: currentTooth.treatments || [], // Убедимся, что treatments всегда массив
        };
      }
    } else if (mode === "treatment") {
      if (!currentTooth.treatments.includes(selectedItem!.label)) {
        // Работаем только с лечением
        const updatedTreatments = [
          ...currentTooth.treatments,
          selectedItem!.label,
        ];
        updatedTooth = {
          ...currentTooth,
          diagnosis: currentTooth.diagnosis || [], // Убедимся, что diagnosis всегда массив
          treatments: updatedTreatments, // Обновляем лечение
        };
      }
    }

    // Обновляем данные зубов
    const updatedTeethData = teethData.some(
      (tooth) => tooth.number === toothNumber
    )
      ? teethData.map((tooth) =>
          tooth.number === toothNumber ? updatedTooth : tooth
        )
      : [...teethData, updatedTooth]; // Если зуба еще не было, добавляем его в массив

    onTeethDataChange(updatedTeethData);
  };

  // В зависимости от режима показываем либо диагнозы, либо лечение
  const items = mode === "diagnosis" ? diagnoses : treatments;

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <div className="flex">
        {/* Список элементов для выбора */}
        <div className="grid grid-cols-2 gap-2 mr-6">
          {items.map((item) => (
            <div
              key={item.label}
              className={`px-4 py-2 rounded border text-left ${
                selectedItem?.label === item.label
                  ? item.label === "Default"
                    ? `bg-gray-500 text-white`
                    : `border-transparent text-white`
                  : `bg-gray-200 hover:bg-gray-300`
              }`}
              style={
                selectedItem?.label === item.label && item.label !== "Default"
                  ? { backgroundColor: item.color }
                  : {}
              }
              onClick={() => handleItemSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Диаграмма зубов */}
        <div className="flex-grow rounded-lg p-4">
          <div className="flex justify-center items-baseline mb-4">
            {upperTeeth.map((tooth: ToothInfo) => (
              <div
                key={tooth.number}
                className="relative cursor-pointer m-1"
                onClick={() => handleToothClick(tooth.number)}
                tabIndex={0}
                role="button"
                aria-label={`Tooth ${tooth.number}`}
              >
                <Image
                  src={`/teeth/tooth${tooth.number}.png`}
                  alt={`Tooth ${tooth.number}`}
                  width={50}
                  height={50}
                />
                {mode === "diagnosis"
                  ? teethData
                      .find((t) => t.number === tooth.number)
                      ?.diagnosis?.map((diagnosisLabel, idx) => {
                        const diagnosis = diagnoses.find(
                          (d) => d.label === diagnosisLabel
                        );
                        return (
                          diagnosis && (
                            <div
                              key={idx}
                              className="absolute inset-0 opacity-50"
                              style={{ backgroundColor: diagnosis.color }}
                            ></div>
                          )
                        );
                      })
                  : teethData
                      .find((t) => t.number === tooth.number)
                      ?.treatments?.map((treatmentLabel, idx) => {
                        const treatment = treatments.find(
                          (t) => t.label === treatmentLabel
                        );
                        return (
                          treatment && (
                            <div
                              key={idx}
                              className="absolute inset-0 opacity-50"
                              style={{ backgroundColor: treatment.color }}
                            ></div>
                          )
                        );
                      })}
              </div>
            ))}
          </div>

          <div className="flex justify-center items-start">
            {lowerTeeth.map((tooth: ToothInfo) => (
              <div
                key={tooth.number}
                className="relative cursor-pointer m-1"
                onClick={() => handleToothClick(tooth.number)}
                tabIndex={0}
                role="button"
                aria-label={`Tooth ${tooth.number}`}
              >
                <Image
                  src={`/teeth/tooth${tooth.number}.png`}
                  alt={`Tooth ${tooth.number}`}
                  width={50}
                  height={50}
                />
                {mode === "diagnosis"
                  ? teethData
                      .find((t) => t.number === tooth.number)
                      ?.diagnosis?.map((diagnosisLabel, idx) => {
                        const diagnosis = diagnoses.find(
                          (d) => d.label === diagnosisLabel
                        );
                        return (
                          diagnosis && (
                            <div
                              key={idx}
                              className="absolute inset-0 opacity-50"
                              style={{ backgroundColor: diagnosis.color }}
                            ></div>
                          )
                        );
                      })
                  : teethData
                      .find((t) => t.number === tooth.number)
                      ?.treatments?.map((treatmentLabel, idx) => {
                        const treatment = treatments.find(
                          (t) => t.label === treatmentLabel
                        );
                        return (
                          treatment && (
                            <div
                              key={idx}
                              className="absolute inset-0 opacity-50"
                              style={{ backgroundColor: treatment.color }}
                            ></div>
                          )
                        );
                      })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeethDiagram;
