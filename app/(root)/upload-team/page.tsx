"use client";
import { Title } from "@/components/ui/title";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ElementGrid from "@/components/shared/element-grid";
import DragDrop from "@/components/ui/drag-drop";

export default function UploadTeam() {
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
    <Container className="max-w-[1000px]">

      <Title text="Clinic: British Smile" size="lg" className="font-bold pt-3" />

      <center className="py-8"><Title text="Upload your team's photos" size="xl" className="font-bold" /></center>

        <Accordion type="multiple" className="bg-[#F8F9FA] rounded-2xl px-5">
        <AccordionItem value="interaoral-photos">
            <AccordionTrigger>Upload INTERAORAL photos here</AccordionTrigger>
            <AccordionContent>
            <ElementGrid>
                <DragDrop variant="upper_occlusal" />
                <DragDrop variant="lower_occlusal" />
                <DragDrop variant="side_left" />
                <DragDrop variant="side_right" />
                <DragDrop variant="frontal_open" />
                <DragDrop variant="frontal_closed" />
            </ElementGrid>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dsd-portraits">
            <AccordionTrigger>Upload DSD and PORTRAITS photos here</AccordionTrigger>
            <AccordionContent>
            <ElementGrid>
                <DragDrop variant="retractor" />
                <DragDrop variant="smile" />
                <DragDrop variant="other_portrait" />
            </ElementGrid>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="x-rays">
            <AccordionTrigger>Upload X-RAYS here</AccordionTrigger>
            <AccordionContent>
            <ElementGrid>
                <DragDrop variant="panoramic_xray" />
                <DragDrop variant="xray" />
            </ElementGrid>
            </AccordionContent>
        </AccordionItem>
        </Accordion>
    </Container>
  );
}