"use client";
import React from "react";
import { PatientCard } from "@/components/shared/patient-card";

const PatientGrid = ({  }) => {
  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mt-5">
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
    </div>
  );
};

export default PatientGrid;
