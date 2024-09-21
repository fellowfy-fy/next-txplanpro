"use client";

import React, { useState } from "react";
import Image from "next/image";
import Teeth, { ToothInfo } from "../shared/teeth-import";
import { diagnoses, Diagnosis } from "../shared/diagnoses";

const TeethDiagram: React.FC = () => {
  const { upperTeeth, lowerTeeth } = Teeth;

  // Состояние для выбранного диагноза
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(
    null
  );

  // Состояние для диагнозов каждого зуба
  const [teethDiagnoses, setTeethDiagnoses] = useState<{
    [key: number]: Diagnosis[];
  }>({});

  // Обработчик выбора диагноза
  const handleDiagnosisSelect = (diagnosis: Diagnosis) => {
    setSelectedDiagnosis((prev) =>
      prev?.label === diagnosis.label ? null : diagnosis
    );
  };

  // Обработчик клика по зубу
  const handleToothClick = (toothNumber: number) => {
    if (!selectedDiagnosis) return;

    setTeethDiagnoses((prev) => {
      const currentDiagnoses = prev[toothNumber] || [];
      // Если выбран диагноз "Default", сбрасываем все диагнозы
      if (selectedDiagnosis.label === "Default") {
        return { ...prev, [toothNumber]: [] };
      }

      // Избегаем дублирования диагнозов
      if (
        currentDiagnoses.some((diag) => diag.label === selectedDiagnosis.label)
      ) {
        return prev;
      }
      return {
        ...prev,
        [toothNumber]: [...currentDiagnoses, selectedDiagnosis],
      };
    });
    console.log(toothNumber, teethDiagnoses);
  };

  return (
    <div className="p-4">
      {/* Кнопки диагнозов */}
      <div className="flex flex-wrap justify-center mb-6">
        {diagnoses.map((diagnosis) => (
          <button
            key={diagnosis.label}
            className={`m-2 px-4 py-2 rounded border ${
              selectedDiagnosis?.label === diagnosis.label
                ? diagnosis.label === "Default"
                  ? `bg-gray-500 text-white`
                  : `border-transparent text-white`
                : `bg-gray-200 hover:bg-gray-300`
            }`}
            style={
              selectedDiagnosis?.label === diagnosis.label &&
              diagnosis.label !== "Default"
                ? { backgroundColor: diagnosis.color }
                : {}
            }
            onClick={() => handleDiagnosisSelect(diagnosis)}
          >
            {diagnosis.label}
          </button>
        ))}
      </div>

      {/* Диаграмма зубов */}
      <div
        className="relative mx-auto bg-gray-100 border border-gray-300 rounded-lg"
        style={{ width: "600px", height: "300px" }}
      >
        {/* Верхние зубы */}
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
              {/* Оверлеи диагнозов */}
              {teethDiagnoses[tooth.number]?.map((diag, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundColor: diag.color,
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>

        {/* Нижние зубы */}
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
              {/* Оверлеи диагнозов */}
              {teethDiagnoses[tooth.number]?.map((diag, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundColor: diag.color,
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeethDiagram;
