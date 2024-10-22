import { urlToFile } from "@/lib/url-to-file";
import { PatientImage } from "@prisma/client";
export async function convertUrlsToFiles<T extends Record<string, File | null>>(
  images: PatientImage[],
  fieldMap: Record<string, keyof T> 
): Promise<T> {
  const uploadedFiles = {} as T;

  for (const image of images) {
    const fieldName = fieldMap[image.type];

    if (fieldName) {
      uploadedFiles[fieldName] = (await urlToFile(
        image.imageUrl,
        `${image.type}.png`,
        "image/png"
      )) as T[keyof T]; // Приведение типа
    } else {
      console.warn(`Unknown image type: ${image.type}`);
    }
  }

  return uploadedFiles;
}
