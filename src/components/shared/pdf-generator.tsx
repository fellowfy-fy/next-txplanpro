"use client";
import React from "react";
import { Container } from "../ui/container";
import { Button } from "../ui/button";
import { Title } from "../ui/title";
import {
  BusinessContent,
  BusinessImage,
  Patient,
  PatientImage,
  Service,
  Tooth,
  User,
} from "@prisma/client";

interface PatientPDFProps {
  patient: Patient;
  doctor: User;
  patientImages: PatientImage[];
  doctorImages: BusinessImage[];
  prices: Service[];
  content: BusinessContent[];
  teeth: Tooth[];
}

export const PdfGenerator: React.FC<PatientPDFProps> = ({
  patient,
  patientImages,
  teeth,
  doctorImages,
  prices,
  doctor,
  content
}) => {
  const handleDownloadPDF = async () => {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient,
        doctor,
        patientImages,
        doctorImages,
        prices,
        content,
        teeth,
      }),
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated.pdf";
      a.click();
    } else {
      console.error("Error downloading the PDF");
    }
  };

  const introText = content.find(item => item.type === 'intro')?.content || "None"
  const visionText = content.find(item => item.type === 'vision')?.content || "None"
  const breakText = content.find(item => item.type === 'break')?.content || "None"
  const servicesText = content.find(item => item.type === 'services')?.content || "None"

  const patientName = patient.fullName
  const doctorName = doctor.fullName

  const introImage = doctorImages.find(item => item.type === 'intro')?.imageUrl
  const visionImage = doctorImages.find(item => item.type === 'vision')?.imageUrl
  const breakImage = doctorImages.find(item => item.type === 'break')?.imageUrl

  const leftSideImage = patientImages.find(item => item.type === 'side_left')?.imageUrl
  const rightSideImage = patientImages.find(item => item.type === 'side_right')?.imageUrl
  const upperOcclusalImage = patientImages.find(item => item.type === 'upper_occlusal')?.imageUrl
  const lowerOcclusalImage = patientImages.find(item => item.type === 'lower_occlusal')?.imageUrl
  const panoramicXrayImage = patientImages.find(item => item.type === 'panoramic_xray')?.imageUrl

  return (
    <Container>
      <Title text={introText} />
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <section className="flex flex-col items-center mt-10">
        <div className="w-[842px] h-[595px] relative">
          <img
            src={introImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <p className="absolute left-0 top-1/2">Patient Name: {patientName}</p>
          <p className="absolute left-0 top-[55%]">Doctor: {doctorName}</p>
        </div>

        <div className="w-[842px] h-[595px] relative">
          <img
            src={visionImage}
            alt="Vision Image"
            className="w-full h-full object-cover"
          />
          <p className="absolute right-1/2 top-[30%]">{visionText}</p>
          <p className="absolute right-0 top-[70%]">Doctor: {doctorName}</p>
        </div>

        <div className="w-[842px] h-[595px] flex justify-between items-end">
          <div className="flex flex-col items-center">
            <img
              src={leftSideImage}
              alt="Left Side Image"
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Left Side</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={rightSideImage}
              alt=""
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Right Side</p>
          </div>
        </div>

        <div className="w-[842px] h-[595px] flex justify-between items-end">
          <div className="flex flex-col items-center">
            <img
              src={lowerOcclusalImage}
              alt="Upper Occlusal"
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Lower Occlusal</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={upperOcclusalImage}
              alt=""
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Upper Occlusal</p>
          </div>
        </div>

        <div className="w-[842px] h-[595px] relative">
          <img
            src={breakImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <p className="absolute right-0 top-[70%]">{breakText}</p>
        </div>

        <div className="w-[842px] h-[595px] flex flex-col">
          <img
            src={panoramicXrayImage}
            alt=""
            className="w-full object-cover mb-4 h-[300px]"
          />
          <div className="flex justify-between flex-grow">
            <div className="flex-1 text-center p-4">
              <p>{servicesText}</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p>{servicesText}</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p>{servicesText}</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
