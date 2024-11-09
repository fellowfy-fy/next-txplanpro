import { getUserSession } from "@/lib/get-user-session";
import { getPatientPlans } from "./actions";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { PatientSearch } from "@/components/shared/patient-search";
import { ActivePatient } from "@/components/shared/active-patient";
import { PlanCardGrid } from "@/components/shared/plan-card-grid";


export default async function AllPlans({ params }: { params: { patientId: string }}) {
  const session = await getUserSession();
  const doctorId = session?.id;

  if (!doctorId) {
    throw new Error("Unauthorized access");
  }

  const result = await getPatientPlans(parseInt(params.patientId), Number(doctorId));
  const {plans, error} = result

  return (
    <Container>
      <Title text="All TxPlans" size="lg" className="font-bold" />
      <PatientSearch />
      <ActivePatient />
      <PlanCardGrid plans={plans} error={error} />
      </Container>
  );
}