import { PageDescription } from "@/components/ui/page-description";
import { Container } from "@/components/ui/container";
import ElementGrid from "@/components/shared/element-grid";
import { PatientCard } from "@/components/shared/patient-card";
import React from "react";
import { Title } from "@/components/ui/title";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export default async function Patients() {
  const session = await getUserSession();
  const doctorName = session?.name;

  const patients = await prisma.patient.findMany({
    where: { doctorId: Number(session?.id) },
  });

  return (
    <Container>
      <PageDescription
        text="Upload patient diagnostic data, create treatment plan or a DSD project"
        size="sm"
        className="pb-4"
      />

      {/* <SearchBox/> */}

      <Title text="Patients" size="lg" className="font-bold pt-3" />

      <ElementGrid>
        {doctorName && (
          <PatientCard doctorName={doctorName} patients={patients} />
        )}
      </ElementGrid>
    </Container>
  );
}
