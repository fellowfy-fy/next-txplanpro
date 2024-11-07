// src/store/patient-store.ts
import { create } from 'zustand';
import { Patient } from '@prisma/client';

interface ActivePatientStore {
  patient: Patient | null;
  setActivePatient: (patient: Patient | null) => void;
  clearActivePatient: () => void;
}

export const useActivePatient = create<ActivePatientStore>((set) => ({
  patient: null,
  setActivePatient: (patient) => set({ patient }),
  clearActivePatient: () => set({ patient: null }),
}));