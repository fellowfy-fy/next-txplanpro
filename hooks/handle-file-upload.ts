import { getSignedURL } from "@/app/(root)/create-plan/actions";
import { computeSHA256 } from "@/lib/computeSHA256";


export const handleFileUpload = async (file: File, patientId: number, key: string) => {
    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
      patientId,
      key
    });
  
    if (signedURLResult.failure != undefined) {
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