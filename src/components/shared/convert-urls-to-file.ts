import { urlToFile } from "@/lib/url-to-file";
import { PatientImage } from "@prisma/client";
export async function convertUrlsToFiles<T extends Record<string, File | null>>(
  images: PatientImage[],
  fieldMap: Record<string, keyof T>
): Promise<T> {
  const uploadedFiles = {} as T;

  for (const image of images) {
    const fieldName = fieldMap[image.name];

    if (fieldName) {
      uploadedFiles[fieldName] = (await urlToFile(
        image.imageUrl,
        `${image.name}.png`,
        "image/png"
      )) as T[keyof T];
    } else {
      console.warn(`Unknown image name: ${image.name}`);
    }
  }

  return uploadedFiles;
}
