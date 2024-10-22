"use client";

import { DragDrop } from "../ui/drag-drop";
import ElementGrid from "./element-grid";

interface PhotosProps<T extends Record<string, File | null>> {
  uploadedFiles: T;
  hasLastDragDrop?: boolean;
  onFileUpload: (variant: keyof T, file: File | null) => void;
}

const Photos = <T extends Record<string, File | null>>({
  uploadedFiles,
  onFileUpload,
  hasLastDragDrop,
}: PhotosProps<T>) => {
  let fileKeys = Object.keys(uploadedFiles) as Array<keyof T>;
  const lastKey = hasLastDragDrop ? fileKeys[fileKeys.length - 1] : null;

  if (hasLastDragDrop) {
    fileKeys = fileKeys.slice(0, -1);
  }
  return (
    <div className="p-6">
      <h3 className="text-lg font-bold mb-4">Uploaded Photos</h3>
      <ElementGrid>
        {fileKeys.map((key) => (
          <DragDrop
            key={String(key)}
            variant={String(key)}
            file={uploadedFiles[key]}
            onFileUpload={onFileUpload}
          />
        ))}
      </ElementGrid>
      {hasLastDragDrop && lastKey && (
        <DragDrop
          variant={lastKey}
          className="w-full mt-5"
          file={uploadedFiles[lastKey] || null}
          onFileUpload={onFileUpload}
        />
      )}
    </div>
  );
};

export default Photos;
