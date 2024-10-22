"use server";

import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ToothData } from "@/components/shared/create-view";
import crypto from "crypto";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

export const createPatient = async (
  { fullName, address, birthDate, teethData, doctorId }: 
  { fullName: string, address: string, birthDate: string, teethData: ToothData[], doctorId: number },

) => {
  try {
    const patient = await prisma.patient.create({
      data: {
        fullName,
        address,
        birthDate: new Date(birthDate),
        doctorId: doctorId,
      },
    });

    if (teethData){
    const teethCreationPromises = teethData.map((tooth) =>
      prisma.tooth.create({
        data: {
          number: tooth.number,
          treatment: tooth.treatments,
          diagnoses: tooth.diagnosis,
          note: tooth.note,
          patientId: patient.id,
        },
      })
    );
    await Promise.all([...teethCreationPromises]);
}
    return { success: true, patientId: patient.id };
  } catch (error) {
    console.error("Error creating patient:", error);
    throw new Error("Failed to create patient");
  }
};



const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    // "image/gif",
    // "image/webp",
    // "image/svg+xml",
    // "image/bmp",
    // "image/tiff",
    // "image/x-icon"
  ];
    
    //   const maxFileSize = 1048576 * 10 
    // 1 MB
      
      
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
businessImage?: boolean
key: string
}

export const getSignedURL = async ({
        fileType,
        fileSize,
        checksum,
        patientId,
        doctorId,
        businessImage,
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
          { expiresIn: 60 } // 60 seconds
        )
        
        if (patientId) {
          const results = await prisma.patientImage.create({
            data: {
              imageUrl: url.split("?")[0],
              patientId,
              type: key
            },
          });

          return { success: { url, id: results.id } }
        }

        if (doctorId && businessImage) {
          const results = await prisma.businessImage.upsert({
            where: {
              doctorId_type: {
                doctorId: doctorId,
                type: key,
              },
            },
            update: {
              imageUrl: url.split("?")[0],
            },
            create: {
              imageUrl: url.split("?")[0],
              doctorId: doctorId,
              type: key,
            },
          });

          return { success: { url, id: results.id } }
        }
      
        return { failure: "Nothing has been loaded to s3 bucket" }
      }
      