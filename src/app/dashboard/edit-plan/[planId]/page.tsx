import { getUserSession } from "@/lib/get-user-session";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { ActivePatient } from "@/components/shared/active-patient";
import { getPlanDetails } from "./actions";
import { PlanUpdateForm } from "@/components/shared/plan-update-form";


export default async function EditPlans({ params }: { params: { planId: string }}) {
  const session = await getUserSession();
  const doctorId = Number(session?.id);

  if (!doctorId) {
    throw new Error("Unauthorized access");
  }

  const result = await getPlanDetails(parseInt(params.planId), doctorId);
  const {plan, error, teeth, images} = result

  return (
    <Container>
      <Title text="All TxPlans" size="lg" className="font-bold" />
      {/* Поиск по плану */}
      <ActivePatient />
      {plan && <PlanUpdateForm plan={plan} doctorId={doctorId} teeth={teeth} images={images} />}
      {error && <div className="text-red-500">{error}</div>}
    </Container>
  );
}