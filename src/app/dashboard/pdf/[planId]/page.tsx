import { PdfGenerator } from "@/components/shared/pdf-generator";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import React from "react";

export default async function Page({ params: { planId }}: { params: { planId: string }}) {
  const session = await getUserSession();
  const planData = await prisma.plan.findFirst({
    where: { 
      id: Number(planId),
      patient: {
        doctor: {
            id: Number(session?.id)
        }
      }
    },
    include: {
      patient: {
        include: {
          doctor: {include: {images: true, prices: true, content: true}},
          images: true,
        }
      },
      teeth: true,
      images: true
    },
  });

  if (!planData) {
    throw new Error("Plan not found or access denied");
  }

  return (
    <div>
      <PdfGenerator
      planData={planData}
      />
    </div>
  );
}
