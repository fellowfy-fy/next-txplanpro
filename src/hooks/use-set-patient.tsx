import { useActivePatient } from "@/store/active-patient";
import { PatientDTO } from "@/components/shared/create-plan-form";

// Используем store для активного пациента

export const useSetPatient = () => {
  const { setActivePatient } = useActivePatient();

  const handlePatientClick = (patient: PatientDTO) => {
    if (patient) {
      setActivePatient(patient);
    }
  };

  return handlePatientClick;
};