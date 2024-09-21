// src/TeethArch.js

import React from "react";
import Tooth from "./Tooth";

const TeethArch = ({
  start,
  end,
  initialStatus,
  isUpper,
  handleToothStatusChange,
  step,
  selectedStatus,
}) => {
  const teeth = [];
  const totalTeeth = end - start + 1;
  const a = isUpper ? 0.017 : -0.017; // Adjust parabola factor
  const h = 95; // Vertex x-coordinate
  const k = isUpper ? 0 : -26; // Vertex y-coordinate

  for (let i = start; i <= end; i++) {
    const x = ((i - start) / (totalTeeth - 1)) * 190; // Calculate x-coordinate
    const y = a * Math.pow(x - h, 2) + k; // Calculate y-coordinate using parabola equation

    teeth.push(
      <Tooth
        key={i}
        id={i}
        className="absolute"
        handleToothStatusChange={handleToothStatusChange}
        status={initialStatus[i]}
        style={{ left: `${x}px`, top: `${y}px` }}
        step={step}
        selectedStatus={selectedStatus}
      />
    );
  }
  return <>{teeth}</>;
};

export default TeethArch;
