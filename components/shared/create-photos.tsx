"use client";

import { useCallback, useState } from "react";
import DragDrop from "../ui/drag-drop";
import ElementGrid from "./element-grid";
import { PhotoGrid } from "./photo-grid";

const Photos = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [databaseFiles, setDatabaseFiles] = useState<File[]>([]);

  const onDropFiles = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const onDropDatabaseFiles = useCallback((acceptedFiles: File[]) => {
    setDatabaseFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-lg font-bold mb-4">Uploaded Photos</h3>

      <PhotoGrid files={[...uploadedFiles, ...databaseFiles]} />

      <ElementGrid>
        <DragDrop variant="upper_occlusal" />
        <DragDrop variant="lower_occlusal" />
        <DragDrop variant="side_left" />
        <DragDrop variant="side_right" />
      </ElementGrid>
      <DragDrop variant="panoramic_xray" className="w-full mt-5" />
    </div>
  );
};

export default Photos;
