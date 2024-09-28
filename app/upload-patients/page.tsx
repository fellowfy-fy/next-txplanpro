"use client";
import { Title } from "@/components/ui/title";
import { useCallback, useState } from "react";
import { PageDescription } from "@/components/ui/page-description";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SearchBox } from "@/components/ui/searchbox";
import { UploadCloud, Cloud } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import DragDrop from "@/components/ui/drag-drop";

export default function UploadPatients() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [databaseFiles, setDatabaseFiles] = useState<File[]>([]);

  const onDropFiles = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const onDropDatabaseFiles = useCallback((acceptedFiles: File[]) => {
    setDatabaseFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const patient = {
  name: "Jane Doe",
  };

  return (
    <Container>
      <PageDescription text="Upload patient diagnostic data, create treatment plan or a DSD project" size="sm" className="pb-4"/>

      <SearchBox/>

      <Title text="Patient: Jane Doe" size="lg" className="font-bold pt-3" />

        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger>Upload INTERAORAL photos here</AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DragDrop
                    onDrop={onDropFiles}
                    label="Drag&Drop files here"
                    description="Upload photos, x-rays, or videos."
                    Icon={UploadCloud}
                    />

                    <DragDrop
                    onDrop={onDropDatabaseFiles}
                    label="Use from TxPlanPro database"
                    description="Upload to database."
                    Icon={Cloud}
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
        </Accordion>

    </Container>
  );
}