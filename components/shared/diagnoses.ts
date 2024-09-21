// components/shared/diagnoses.ts

export interface Diagnosis {
    label: string;
    color: string; // Tailwind CSS цвет
  }
  
  export const diagnoses: Diagnosis[] = [
    { label: "Extracted", color: "#FF0000" },               // Красный
    { label: "Tooth Crown", color: "#0000FF" },            // Синий
    { label: "Implant Crown", color: "#008000" },          // Зелёный
    { label: "Implant", color: "#800080" },                // Фиолетовый
    { label: "Root Recession", color: "#FFA500" },         // Оранжевый
    { label: "Altered Passive Eruption", color: "#FFFF00" }, // Жёлтый
    { label: "Filling", color: "#FFC0CB" },                // Розовый
    { label: "Default", color: "transparent" },            // Прозрачный для сброса
  ];
  