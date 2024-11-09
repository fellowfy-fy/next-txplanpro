"use server";

import { ToothData } from "@/components/shared/create-plan-form";
import { prisma } from "@/prisma/prisma-client";
import { Plan, PlanImage, Tooth } from "@prisma/client";

interface Result {
  plan?: Plan | null;
  error?: string
  teeth?: Tooth[];
  images?: PlanImage[];
}

export async function getPlanDetails(planId: number, doctorId: number) {
  const result: Result = {}
  try {
    if (!planId) {
      throw new Error("Invalid plan ID");
    }
    const plan = await prisma.plan.findUnique({
      where: {
        id: planId,
        patient: {
          doctorId: doctorId
        }
      },
      include: {
        teeth: true,
        images: true
      }
    });

    if (!plan) {
      throw new Error("Plan not found");
    }
    result.plan = plan
    result.teeth = plan.teeth
    result.images = plan.images
  } catch (error) {
    console.error("Error fetching plan:", error);
    result.error = `Failed to fetch plan! ${error}`;
  } finally {
    return result;
  }
};

export type PlanDTO = {
  title: string | null;
  teeth?: ToothData[];
};

export async function updatePlan(data: PlanDTO, planId: number) {
  const result: Result = {};

  try {
    const updatedPlan = await prisma.plan.update({
      where: {
        id: planId
      },
      data: {
        title: data.title,
        ...(data.teeth && {
          teeth: {
            deleteMany: {
              planId: planId
            },
            createMany: {
              data: data.teeth.map(tooth => ({
                number: tooth.number,
                diagnosis: tooth.diagnosis,
                treatments: tooth.treatments,
                note: tooth.note ?? null,
              }))
            }
          }
        })
      },
      include: {
        teeth: true
      }
    });

    if (updatedPlan) {
      result.plan = updatedPlan;
    } else {
      throw new Error("Failed to update plan");
    }

    return result;

  } catch (error) {
    console.error("Error updating plan:", error);
    result.error = error instanceof Error ? error.message : "Unknown error occurred";
    return result;
  }
}