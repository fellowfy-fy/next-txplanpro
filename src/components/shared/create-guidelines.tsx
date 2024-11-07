"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const guidelineOptions = [
  "Complex case (Total)",
  "Increase VDO",
  "Implants",
  "Surgical Crown Lengthening",
  "Recessions Surgery",
  "Bone Augmentation",
  "Soft Tissue Augmentation",
  "Needs Ortho",
  "Extractions",
  "Endo Treatment",
];

const Guidelines = () => {
  const [selectedGuidelines, setSelectedGuidelines] = useState<{ [key: string]: boolean }>({});

  const handleSwitchToggle = (option: string) => {
    setSelectedGuidelines((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-bold mb-4">Guidelines</h3>
      <div className="space-y-4">
        {guidelineOptions.map((option) => (
          <div key={option} className="flex">
            <Switch
              checked={selectedGuidelines[option] || false}
              onCheckedChange={() => handleSwitchToggle(option)}
            />
            <label className="ml-4 text-gray-600">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guidelines;
