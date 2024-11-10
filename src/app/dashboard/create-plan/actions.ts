"use server";
import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { ToothData } from "@/components/shared/create-plan-form";

const prisma = new PrismaClient();

export const createPatient = async (
  { fullName, address, birthDate, doctorId }:
    { fullName: string, address: string, birthDate: Date, doctorId: number },
) => {
  try {
    const patient = await prisma.patient.create({
      data: {
        fullName,
        address,
        birthDate: birthDate,
        doctorId: doctorId,
      },
    });

    return { success: true, patientId: patient.id };
  } catch (error) {
    console.error("Error creating patient:", error);
    throw new Error("Failed to create patient [PATIENT_CREATION]");
  }
};


export const createPlan = async (
  { title, teeth, patientId, doctorId }:
    { title?: string | null, teeth: ToothData[], patientId: number, doctorId: number },
) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id_doctorId: {
          id: patientId,
          doctorId: doctorId,
        }
      }
    });

    if (!patient) {
      throw new Error('Patient not found or access denied');
    }

    const plan = await prisma.plan.create({
      data: {
        title,
        patientId,
      }
    })

    if (!plan) {
      throw new Error('Plan not created');
    }

    if (teeth) {
      const teethCreationPromises = teeth.map((tooth) =>
        prisma.tooth.create({
          data: {
            number: tooth.number,
            treatments: tooth.treatments,
            diagnosis: tooth.diagnosis,
            note: tooth.note,
            planId: plan.id,
          },
        })
      );
      await Promise.all([...teethCreationPromises]);
    }

    return { success: true, planId: plan.id };


  } catch (error) {
    console.error("Error creating patient:", error);
    throw new Error("Failed to create patient [PATIENT_CREATION]");
  }
};

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_PUBLIC_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
];

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string; id: number } }
  | { failure: string; success?: undefined }
>

type GetSignedURLParams = {
  fileType: string
  fileSize: number
  checksum: string
  patientId?: number
  doctorId?: number
  planId?: number
  businessImage?: boolean
  patientImage?: boolean
  planImage?: boolean
  key: string
}

export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
  patientId,
  doctorId,
  planId,
  businessImage,
  patientImage,
  planImage,
  key
}: GetSignedURLParams): Promise<SignedURLResponse> => {


  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" }
  }

  const fileName = generateFileName()

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  })

  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 }
  )

  if (patientId && patientImage) {
    const results = await prisma.patientImage.create({
      data: {
        imageUrl: url.split("?")[0],
        patientId,
        name: key
      },
    });

    return { success: { url, id: results.id } }
  }

  if (doctorId && businessImage) {
    const results = await prisma.businessImage.upsert({
      where: {
        doctorId_name: {
          doctorId: doctorId,
          name: key,
        },
      },
      update: {
        imageUrl: url.split("?")[0],
      },
      create: {
        imageUrl: url.split("?")[0],
        doctorId: doctorId,
        name: key,
      },
    });

    return { success: { url, id: results.id } }
  }
  if (planId && planImage) {
    const results = await prisma.planImage.upsert({
      where: {
        planId_name: {
          planId: planId,
          name: key,
        },
      },
      update: {
        imageUrl: url.split("?")[0],
      },
      create: {
        imageUrl: url.split("?")[0],
        planId: planId,
        name: key,
      },
    });

    return { success: { url, id: results.id } }
  }

  return { failure: "Nothing has been loaded to s3 bucket" }
}
