"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DragDropVariant, DragAndDropData } from "@/constants/dnd-data";

interface DragDropProps {
  variant?: DragDropVariant;
  className?: string;
  file: File | null;
  onFileUpload: (variant: string, file: File | null) => void;
}

export const DragDrop = ({
  variant = "upper_occlusal",
  className,
  file,
  onFileUpload,
}: DragDropProps) => {
  const { label, description, Icon } = DragAndDropData[variant];

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile && selectedFile.type.startsWith("image/")) {
        onFileUpload(variant, selectedFile);
      } else {
        alert("Please select an image file.");
      }
    },
    [onFileUpload, variant]
  );

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "p-6 border-dashed border-2 rounded-lg text-center bg-gray-100 cursor-pointer",
          className
        )}
      >
        {!file ? (
          <div className="h-40">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id={`file-upload-${variant}`}
            />
            <Icon className="text-blue-500 mx-auto mb-2" size={36} />
            <p>{label}</p>
            <p className="text-gray-500">{description}</p>
            <label
              htmlFor={`file-upload-${variant}`}
              className="cursor-pointer"
            >
              <p className="text-blue-500 mb-2">Upload Image</p>
            </label>
          </div>
        ) : (
          <div
            className="relative w-full h-40 cursor-pointer overflow-hidden"
            onClick={() => onFileUpload(variant, null)}
          >
            <p>{label}</p>

            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
