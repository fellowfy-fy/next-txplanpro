import { PdfGenerator } from "@/components/shared/pdf-generator";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import React from "react";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const patientData = await prisma.patient.findFirst({
    where: { id: Number(id) },
    include: {
      images: true,
      teeth: true,
    },
  });

  if (!patientData) {
    return <div>Patient not found</div>;
  }

  const session = await getUserSession();
  const doctorData = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
    include: {
      prices: true,
      images: true,
      content: true,
    },
  });
  if (!doctorData) {
    return <div>Doctor is not authorized</div>;
  }
  const { images: patientImages, teeth, ...patient } = patientData;
  const { images: doctorImages, prices, content, ...doctor } = doctorData;

  return (
    <div>
      <PdfGenerator
        patient={patient}
        patientImages={patientImages}
        teeth={teeth}
        doctorImages={doctorImages}
        prices={prices}
        doctor={doctor}
        content={content}
      />
    </div>
  );
}
