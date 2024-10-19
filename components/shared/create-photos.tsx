"use client";

import { DragDrop } from "../ui/drag-drop";
import ElementGrid from "./element-grid";
import { TPatientFormValues } from "@/constants/patient-schema";

interface PhotosProps {
  uploadedFiles: TPatientFormValues["uploadedFiles"];

  onFileUpload: (
    variant: keyof TPatientFormValues["uploadedFiles"],
    file: File | null
  ) => void;
}

const Photos = ({ uploadedFiles, onFileUpload }: PhotosProps) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-bold mb-4">Uploaded Photos</h3>

      <ElementGrid>
        <DragDrop
          variant="upper_occlusal"
          file={uploadedFiles.upper_occlusal}
          onFileUpload={onFileUpload}
        />
        <DragDrop
          variant="lower_occlusal"
          file={uploadedFiles.lower_occlusal}
          onFileUpload={onFileUpload}
        />
        <DragDrop
          variant="side_left"
          file={uploadedFiles.side_left}
          onFileUpload={onFileUpload}
        />
        <DragDrop
          variant="side_right"
          file={uploadedFiles.side_right}
          onFileUpload={onFileUpload}
        />
      </ElementGrid>

      <DragDrop
        variant="panoramic_xray"
        className="w-full mt-5"
        file={uploadedFiles.panoramic_xray}
        onFileUpload={onFileUpload}
      />
    </div>
  );
};

export default Photos;
