import { getUserSession } from "@/lib/get-user-session";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { ActivePatient } from "@/components/shared/active-patient";
import { getPatientDetails } from "./actions";
import { PatientUpdateForm } from "@/components/shared/forms/patient-update-form";


export default async function EditPatient({ params }: { params: { patientId: string }}) {
  const session = await getUserSession();
  const doctorId = Number(session?.id);

  if (!doctorId) {
    throw new Error("Unauthorized access");
  }

  const result = await getPatientDetails(parseInt(params.patientId), doctorId);
  const {patient, error} = result

  return (
    <Container>
      {patient && <PatientUpdateForm patient={patient} />}
      {error && <div className="text-red-500">{error}</div>}
    </Container>
  );
}