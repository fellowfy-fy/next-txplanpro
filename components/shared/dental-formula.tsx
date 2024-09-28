"use client";

import React from "react";
import TeethDiagram from "./teeth-form";
import { Button } from "@/components/ui/button";

const DentalFormula = () => {
  return (
    <div className="p-6">
      <h2 className="text-center text-lg font-bold mb-4">Fill-in Your patient’s dental formula</h2>
      
      {/* Диаграмма зубов */}
      <TeethDiagram />
      
      {/* Кнопки */}
      <div className="flex justify-center gap-4 mt-6">
        <Button variant="outline" className="px-6 py-2 flex items-center space-x-2">
          <span>✨ Ai-based fill-in</span>
        </Button>
        <Button variant="outline" className="px-6 py-2">
          Save dental formula
        </Button>
      </div>
    </div>
  );
};

export default DentalFormula;
