import { Title } from "@/components/ui/title";
import { Container } from "@/components/shared/container";
import { PatientCard } from "@/components/shared/patient-card";
export default function Home() {
  return (
    <Container className="mt-7">
      <Title text="Welcome to TxPlanPro!" size="2xl" className="font-bold" />
      <PatientCard />
    </Container>
  );
}
