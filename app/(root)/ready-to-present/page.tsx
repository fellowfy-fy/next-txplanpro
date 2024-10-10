"use client";
import { Title } from "@/components/ui/title";
import { Container } from "@/components/ui/container";
import { useRouter } from "next/navigation";
import { PatientCard } from "@/components/shared/patient-card";
import ElementGrid from "@/components/shared/element-grid";

export default function ReadyToPresent() {
  const router = useRouter();

  return (
    <Container>
      <Title text="Your Ready To Present Plans" size="lg" className="font-bold" />

      <ElementGrid>
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </ElementGrid>

    </Container>
  );
}
