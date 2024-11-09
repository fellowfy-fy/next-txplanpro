"use server";
import { prisma } from "@/prisma/prisma-client";
import { Plan } from "@prisma/client";

interface Result {
  plans?: Plan[];
  error?: string
}

export async function getPatientPlans(patientId: number | undefined, doctorId: number) {
  const result: Result = {}
  try {
    if (!patientId) {
      throw new Error("Invalid patient ID");
    }
    const patient = await prisma.patient.findUnique({
      where: {
        id_doctorId: {
          id: patientId,
          doctorId: doctorId,
        }
      }
    });

    if (!patient) {
      throw new Error("Patient not found");
    }
    result.plans = await prisma.plan.findMany({
      where: {
        patientId: patientId
      },
    });

  } catch (error) {
    console.error("Error fetching plans:", error);
    result.error = `Failed to fetch plans! ${error}`;
  } finally {
    return result;
  }
}