"use client";

import { useCallback, useState } from "react";
import { UploadCloud, Cloud } from "lucide-react";
import DragDrop from "../ui/drag-drop";

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
      <ul className="mb-6">
        {uploadedFiles.length === 0 && databaseFiles.length === 0 ? (
          <p className="text-gray-400">No files uploaded yet.</p>
        ) : (
          [...uploadedFiles, ...databaseFiles].map((file, index) => (
            <li key={index} className="text-gray-600">
              {file.name}
            </li>
          ))
        )}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drag & Drop для загрузки файлов */}
        <DragDrop
          onDrop={onDropFiles}
          label="Drag&Drop files here"
          description="Upload photos, x-rays, or videos."
          Icon={UploadCloud}
        />

        {/* Drag & Drop для загрузки из базы данных */}
        <DragDrop
          onDrop={onDropDatabaseFiles}
          label="Use from TxPlanPro database"
          description="Upload to database."
          Icon={Cloud}
        />
      </div>
    </div>
  );
};

export default Photos;
