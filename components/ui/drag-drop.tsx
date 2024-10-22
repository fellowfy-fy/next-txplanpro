"use client";

import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { DragAndDropData } from "@/constants/dnd-data";

interface DragDropProps<T extends Record<string, File | null>> {
  variant: keyof T;
  className?: string;
  file: File | null;
  onFileUpload: (variant: keyof T, file: File | null) => void;
}

export const DragDrop = <T extends Record<string, File | null>>({
  variant,
  className,
  file,
  onFileUpload,
}: DragDropProps<T>) => {
  const { label, description, Icon } =
    variant in DragAndDropData
      ? DragAndDropData[variant as keyof typeof DragAndDropData]
      : {
          label: "No variant",
          description: "Variant not found",
          Icon: () => <div>No Icon</div>, // Иконка по умолчанию
        };

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className={cn(
          "p-6 border-dashed border-2 rounded-lg text-center bg-gray-100 ",
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
              id={`file-upload-${String(variant)}`}
            />
            <Icon className="text-blue-500 mx-auto mb-2" size={36} />
            <p>{label}</p>
            <p className="text-gray-500">{description}</p>
            <label
              htmlFor={`file-upload-${String(variant)}`}
              className="cursor-pointer"
            >
              <p className="text-blue-500 mb-2">Upload Image</p>
            </label>
          </div>
        ) : (
          <div className="relative w-full h-40 overflow-hidden">
            <p>{label}</p>
            <span
              onClick={() => onFileUpload(variant, null)}
              className="cursor-pointer text-blue-500 w-auto"
            >
              Delete Image
            </span>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg cursor-pointer"
                onClick={openModal} // Открыть модальное окно при клике на изображение
              />
            )}
          </div>
        )}
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Full size preview"
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
