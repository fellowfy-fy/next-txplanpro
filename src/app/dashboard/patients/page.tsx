import { PageDescription } from "@/components/ui/page-description";
import { Container } from "@/components/ui/container";
import ElementGrid from "@/components/shared/element-grid";
import { PatientCard } from "@/components/shared/patient-card";
import React from "react";
import { Title } from "@/components/ui/title";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { CreateNewPatientCard } from "@/components/shared/create-new-patient-card";
import { PatientSearch } from "@/components/shared/patient-search";
import { ActivePatient } from "@/components/shared/active-patient";

export default async function Patients() {
  const session = await getUserSession();
  const patients = session
    ? await prisma.patient.findMany({
        where: { doctorId: Number(session?.id) },
      })
    : [];

  return (
    <Container>
      <PageDescription
        text="Upload patient diagnostic data, create treatment plan or a DSD project"
        size="sm"
        className="pb-4"
      />

      <PatientSearch />
      <Title text="Patients" size="lg" className="font-bold pt-3" />
      <CreateNewPatientCard />
      <ElementGrid>
        {session && patients.length > 0 && (
          <PatientCard doctor={session} patients={patients} />
        )}
      </ElementGrid>
    </Container>
  );
}
