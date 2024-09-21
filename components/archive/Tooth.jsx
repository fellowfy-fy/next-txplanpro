import { useState, useEffect } from "react";
import { toothImages } from "./DentalFormula";

const statusToFilterClass = {
  default: "",
  Extracted:
    "invert-[.86] sepia-[.37] saturate-[40.52] hue-rotate-[57deg] brightness-[1.01] contrast-[1.06]",
  "Tooth Crown":
    "invert-[.34] sepia-[.43] saturate-[63.2] hue-rotate-[232deg] brightness-[.84] contrast-[.82]",
  "Implant crown":
    "invert-[.16] sepia-[.75] saturate-[51.38] hue-rotate-[350deg] brightness-[.86] contrast-[.94]",
  Implant:
    "invert-[.85] sepia-[.15] saturate-[37.59] hue-rotate-[236deg] brightness-[.85] contrast-[.89]",
  "Root recession":
    "invert-[.18] sepia-[.19] saturate-[65.78] hue-rotate-[206deg] brightness-[.97] contrast-[.97]",
  "Altered Passive Eruption":
    "invert-[.92] sepia-[.32] saturate-[5.4] hue-rotate-[3deg] brightness-[.89] contrast-[.82]",
  Filling:
    "invert-[.3] sepia-[.23] saturate-[10.1] hue-rotate-[351deg] brightness-[.97] contrast-[.9]",
  "New Implant":
    "invert-[.86] sepia-[.37] saturate-[40.52] hue-rotate-[57deg] brightness-[1.01] contrast-[1.06]",
  "Gingival graft":
    "invert-[.34] sepia-[.43] saturate-[63.2] hue-rotate-[232deg] brightness-[.84] contrast-[.82]",
  GBR: "invert-[.16] sepia-[.75] saturate-[51.38] hue-rotate-[350deg] brightness-[.86] contrast-[.94]",
  "Surgical tooth lengthening":
    "invert-[.85] sepia-[.15] saturate-[37.59] hue-rotate-[236deg] brightness-[.85] contrast-[.89]",
  "Recession closure":
    "invert-[.18] sepia-[.19] saturate-[65.78] hue-rotate-[206deg] brightness-[.97] contrast-[.97]",
  "Sinus-lifting":
    "invert-[.92] sepia-[.32] saturate-[5.4] hue-rotate-[3deg] brightness-[.89] contrast-[.82]",
  Extraction:
    "invert-[.3] sepia-[.23] saturate-[10.1] hue-rotate-[351deg] brightness-[.97] contrast-[.9]",
};

const Tooth = ({
  id,
  className,
  style,
  handleToothStatusChange,
  status: initialStatus,
  step,
  selectedStatus,
}) => {
  const [status, setStatus] = useState(initialStatus || "default");

  useEffect(() => {
    setStatus(initialStatus || "default");
  }, [initialStatus]);

  const handleClick = () => {
    const newStatus = selectedStatus || "default";
    setStatus(newStatus);
    if (handleToothStatusChange) {
      handleToothStatusChange(id, newStatus, step);
    }
  };

  if (!toothImages[id]) {
    console.error(`No image found for tooth ${id}`);
    return null;
  }

  const toothImage = toothImages[id].default;
  const filterClass = statusToFilterClass[status] || "";

  return (
    <div
      onClick={handleClick}
      className={`w-8 h-8 cursor-pointer ${className || ""}`}
      style={style}
    >
      <img
        src={toothImage}
        alt={`Tooth ${id}`}
        className={`w-full h-full ${filterClass}`}
      />
    </div>
  );
};

export default Tooth;
