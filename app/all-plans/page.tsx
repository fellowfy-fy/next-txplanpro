"use client";
import { Title } from "@/components/ui/title";
import { PageDescription } from "@/components/ui/page-description";
import { Container } from "@/components/ui/container";
import { useRouter } from "next/navigation";
import { PatientCard } from "@/components/shared/patient-card";
import ElementGrid from "@/components/shared/element-grid";

export default function AllPlans() {
  const router = useRouter();

  return (
    <Container>
      <Title text="All TxPlans" size="lg" className="font-bold" />

      <ElementGrid>
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </ElementGrid>

    </Container>
  );
}
