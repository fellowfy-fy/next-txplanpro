"use client";
import { Title } from "@/components/ui/title";
import { useCallback, useState } from "react";
import { PageDescription } from "@/components/ui/page-description";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SearchBox } from "@/components/ui/searchbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ElementGrid from "@/components/shared/element-grid";
import DragDrop from "@/components/ui/drag-drop";

export default function UploadClinic() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [databaseFiles, setDatabaseFiles] = useState<File[]>([]);

  const onDropFiles = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const onDropDatabaseFiles = useCallback((acceptedFiles: File[]) => {
    setDatabaseFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  return (
    <Container className="max-w-[1000px]">
      <PageDescription text="Upload Your clinic photos to be used in Your treatment plans templates" size="sm" className="pb-4"/>

      <SearchBox/>

      <Title text="Dr. Jane Doe" size="lg" className="font-bold pt-3" />

      <center className="py-8"><Title text="Upload Clinic logo & photos" size="xl" className="font-bold" /></center>

            <ElementGrid>
                <DragDrop variant="intro" />
                <DragDrop variant="vision" />
                <DragDrop variant="break" />
            </ElementGrid>
    </Container>
  );
}