"use client";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  label: string;
  description: string;
  Icon: LucideIcon;
}

const DragDrop = ({ onDrop, label, description, Icon }: DropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="p-6 border-dashed border-2 rounded-lg text-center bg-gray-100 cursor-pointer"
    >
      <input {...getInputProps()} />
      <Icon className="text-blue-500 mx-auto mb-2" size={36} />
      <p>{label}</p>
      <p className="text-gray-500">{description}</p>
      <Button variant="link" className="mt-2">
        Browse files
      </Button>
    </div>
  );
};

export default DragDrop;
