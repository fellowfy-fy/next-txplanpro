"use server";

import { ToothData } from "@/components/shared/create-plan-form";
import { prisma } from "@/prisma/prisma-client";
import { Patient } from "@prisma/client";

interface Result {
  patient?: Patient | null;
  error?: string;
}

export async function getPatientDetails(patientId: number, doctorId: number) {
  const result: Result = {}
  try {
    if (!patientId) {
      throw new Error("Invalid patient ID");
    }
    const patient = await prisma.patient.findUnique({
      where: {
        id_doctorId: {
          id: patientId,
          doctorId: doctorId
        }
      }
    });

    if (!patient) {
      throw new Error("Plan not found");
    }
    result.patient = patient;
  } catch (error) {
    console.error("Error fetching patient:", error);
    result.error = `Failed to fetch patient! ${error}`;
  } finally {
    return result;
  }
};

export type PatientDTO = {
  fullName: string;
  birthDate: Date;
  address: string;
};

export async function updatePatient(data: PatientDTO, patientId: number) {
  const result: Result = {};

  try {
    if (!patientId) {
      throw new Error("Patient ID is required");
    }

    const existingPatient = await prisma.patient.findUnique({
      where: { id: patientId }
    });

    if (!existingPatient) {
      throw new Error(`Patient with id ${patientId} not found`);
    }

    const updatedPatient = await prisma.patient.update({
      where: {
        id: patientId
      },
      data: {
        fullName: data.fullName,
        birthDate: new Date(data.birthDate),
        address: data.address
      },
    });

    if (updatedPatient) {
      result.patient = updatedPatient;
    } else {
      throw new Error("Failed to update patient");
    }

    return result;

  } catch (error) {
    console.error("Error updating patient:", error);
    result.error = error instanceof Error ? error.message : "Unknown error occurred";
    return result;
  }
}