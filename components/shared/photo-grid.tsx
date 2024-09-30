import React from "react";

interface PhotoGridProps {
  files: File[];
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ files }) => {
  if (files.length === 0) {
    return <p className="text-gray-400">No files uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {files.map((file, index) => {
        const fileUrl = URL.createObjectURL(file);
        return (
          <div key={index} className="relative">
            <img
              src={fileUrl}
              alt={file.name}
              className="object-cover w-full h-40 rounded-md"
            />
            <p className="text-xs text-gray-600 text-center mt-2">{file.name}</p>
          </div>
        );
      })}
    </div>
  );
};
