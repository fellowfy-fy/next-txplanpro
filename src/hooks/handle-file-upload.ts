"use client"
import { getSignedURL } from "@/app/dashboard/create-plan/actions";
import { computeSHA256 } from "@/lib/computeSHA256";

interface HandleFileUploadProps {
  file: File;
  key: string;
  patientId?: number;
  doctorId?: number;
  planId?: number;
  businessImage?: boolean;
  patientImage?: boolean
  planImage?: boolean
}

export const handleFileUpload = async ({
  file,
  key,
  patientId,
  doctorId,
  planId,
  businessImage,
  patientImage,
  planImage,
}: HandleFileUploadProps) => {
  let signedURLResult;

  if (patientId && patientImage) {
    signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
      patientId,
      key
    });
  } else if (doctorId && businessImage) {
    signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
      doctorId,
      businessImage,
      key
    });
  } else if (planId && planImage) {
    signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
      planId,
      planImage,
      key
    });
  } else {
    signedURLResult = { failure: "Something went wrong [FILE UPLOAD ERROR]" };
  }


  if (signedURLResult.failure != undefined && signedURLResult) {
    throw new Error(signedURLResult.failure);
  }

  const { url } = signedURLResult.success;

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return url;
};