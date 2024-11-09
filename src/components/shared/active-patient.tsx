"use client";
import { useActivePatient } from '@/store/active-patient';
import React from 'react';

export const ActivePatient: React.FC = () => {
  const { patient } = useActivePatient();

  
  if (!patient) {
    return <div>Patient not selected</div>;
  }
  
  return (
    <div>
      <h2>Active patient:</h2>
      <p>ID: {patient.id}</p>
      <p>Full Name: {patient.fullName}</p>
      <p>BirthDate: {new Date(patient.birthDate).toLocaleDateString()}</p>
      <p>Address: {patient.address}</p>
    </div>
  );
};