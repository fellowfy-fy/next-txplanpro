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
      <PageDescription text="Unlock the world of web development effortlessly with our innovative e-learning courses. Elevate your skills, build a dynamic portfolio, and launch your web development or no-code career with our industry-aligned certifications and dedicated job placement assistance." size="xs" className="pb-3 lg:pb-0 max-w-[1200px]"/>

      <ElementGrid>
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </ElementGrid>

    </Container>
  );
}
