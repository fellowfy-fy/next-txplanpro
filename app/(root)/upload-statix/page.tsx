"use client";
import { Title } from "@/components/ui/title";
import { useCallback, useState } from "react";
import { PageDescription } from "@/components/ui/page-description";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SearchBox } from "@/components/ui/searchbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadStatix() {
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
      <PageDescription text="Upload static texts..." size="sm" className="pb-4"/>

      <Title text="Clinic: British Smile" size="lg" className="font-bold pt-3" />

      <center className="py-8"><Title text="Describe your clinic and your care" size="xl" className="font-bold" /></center>

      <div className="pb-3">
        <p className="pb-2">Slide 1</p>
        <Input placeholder="Sample Text 1"/>
      </div>
      <div className="pb-3">
        <p className="pb-2">Slide 2</p>
        <Input placeholder="Sample Text 2"/>
      </div>
      <div className="pb-3">
        <p className="pb-2">Slide3</p>
        <Input placeholder="Sample Text 3"/>
      </div>
      <div className="pb-3">
        <p className="pb-2">Slide 4</p>
        <Input placeholder="Sample Text 4"/>
      </div>
      <div className="pb-5">
        <p className="pb-2">Slide 5</p>
        <Input placeholder="Sample Text 5"/>
      </div>  


      <Button variant="secondary">Update Static Text</Button>
    </Container>
  );
}
