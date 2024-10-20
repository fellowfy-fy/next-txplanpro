import { TPatientFormValues } from "@/constants/patient-schema";
import { urlToFile } from "@/lib/url-to-file";
import { PatientDTO } from "./create-view";

export async function convertUrlsToFiles(patient: PatientDTO) {
    const uploadedFiles: Record<
      keyof TPatientFormValues["uploadedFiles"],
      File | null
    > = {
      upper_occlusal: null,
      lower_occlusal: null,
      side_left: null,
      side_right: null,
      panoramic_xray: null,
    };
  
    if (patient.images && Array.isArray(patient.images)) {
      // Проходим по массиву изображений и сопоставляем по типу
      for (const image of patient.images) {
        switch (image.type) {
          case "upper_occlusal":
            uploadedFiles.upper_occlusal = await urlToFile(
              image.imageUrl,
              "upper_occlusal.png",
              "image/png"
            );
            break;
          case "lower_occlusal":
            uploadedFiles.lower_occlusal = await urlToFile(
              image.imageUrl,
              "lower_occlusal.png",
              "image/png"
            );
            break;
          case "side_left":
            uploadedFiles.side_left = await urlToFile(
              image.imageUrl,
              "side_left.png",
              "image/png"
            );
            break;
          case "side_right":
            uploadedFiles.side_right = await urlToFile(
              image.imageUrl,
              "side_right.png",
              "image/png"
            );
            break;
          case "panoramic_xray":
            uploadedFiles.panoramic_xray = await urlToFile(
              image.imageUrl,
              "panoramic_xray.png",
              "image/png"
            );
            break;
          default:
            console.warn(`Unknown image type: ${image.type}`);
            break;
        }
      }
    }
  
    return uploadedFiles;
  }