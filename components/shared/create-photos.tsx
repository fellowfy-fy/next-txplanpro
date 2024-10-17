"use client";

import { useCallback, useState } from "react";
import { DragDrop } from "../ui/drag-drop";
import ElementGrid from "./element-grid";

const Photos = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: File | null;
  }>({
    upper_occlusal: null,
    lower_occlusal: null,
    side_left: null,
    side_right: null,
    panoramic_xray: null,
  });

  const handleFileUpload = useCallback((variant: string, file: File | null) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [variant]: file,
    }));
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-lg font-bold mb-4">Uploaded Photos</h3>

      <ElementGrid>
        <DragDrop
          variant="upper_occlusal"
          file={uploadedFiles.upper_occlusal}
          onFileUpload={handleFileUpload}
        />
        <DragDrop
          variant="lower_occlusal"
          file={uploadedFiles.lower_occlusal}
          onFileUpload={handleFileUpload}
        />
        <DragDrop
          variant="side_left"
          file={uploadedFiles.side_left}
          onFileUpload={handleFileUpload}
        />
        <DragDrop
          variant="side_right"
          file={uploadedFiles.side_right}
          onFileUpload={handleFileUpload}
        />
      </ElementGrid>

      <DragDrop
        variant="panoramic_xray"
        className="w-full mt-5"
        file={uploadedFiles.panoramic_xray}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default Photos;
