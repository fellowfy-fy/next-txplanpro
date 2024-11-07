// components/shared/diagnoses.ts

export interface TreatmentProps {
    label: string;
    color: string; // Tailwind CSS цвет
  }
  
  export const treatments: TreatmentProps[] = [
    { label: "TExtracted", color: "#FF0000" },               // Красный
    { label: "TTooth Crown", color: "#0000FF" },            // Синий
    { label: "TImplant Crown", color: "#008000" },          // Зелёный
    { label: "TImplant", color: "#800080" },                // Фиолетовый
    { label: "TRoot Recession", color: "#FFA500" },         // Оранжевый
    { label: "TAltered Passive Eruption", color: "#FFFF00" }, // Жёлтый
    { label: "TFilling", color: "#FFC0CB" },                // Розовый
    { label: "Default", color: "transparent" },            // Прозрачный для сброса
  ];
  