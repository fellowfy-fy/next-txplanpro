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
  Plan,
  PlanImage,
  Service,
  Tooth,
  User,
} from "@prisma/client";

type PlanWithRelations = Plan & {
  teeth: Tooth[];
  images: PlanImage[];
  patient: Patient & {
    images: PatientImage[];
    doctor: User & {
      images: BusinessImage[];
      prices: Service[];
      content: BusinessContent[];
    };
  };
};

interface PdfGeneratorProps {
  planData: PlanWithRelations;
}

export const PdfGenerator: React.FC<PdfGeneratorProps> = ({
  planData
}) => {
  const {
    title: planTitle,
    teeth,
    images: planImages,
    patient: {
      fullName: patientFullName,
      birthDate,
      address,
      images: patientImages,
      doctor: {
        fullName: doctorFullName,
        images: doctorImages,
        prices,
        content
      }
    }
  } = planData;
  const handleDownloadPDF = async () => {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planData
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

  const settingsPlaceholder = "Please go to settings to add your values";
  const planPlaceholder = "Please go to plan to add your values";

  const introText = content.find(item => item.name === 'intro')?.content || settingsPlaceholder
  const visionText = content.find(item => item.name === 'vision')?.content || settingsPlaceholder
  const breakText = content.find(item => item.name === 'break')?.content || settingsPlaceholder
  const servicesText = content.find(item => item.name === 'services')?.content || settingsPlaceholder

  const patientName = patientFullName
  const doctorName = doctorFullName

  const introImage = doctorImages.find(item => item.name === 'intro')?.imageUrl
  const visionImage = doctorImages.find(item => item.name === 'vision')?.imageUrl
  const breakImage = doctorImages.find(item => item.name === 'break')?.imageUrl


  const leftSideImage = planImages.find(item => item.name === 'side_left')?.imageUrl
  const rightSideImage = planImages.find(item => item.name === 'side_right')?.imageUrl
  const upperOcclusalImage = planImages.find(item => item.name === 'upper_occlusal')?.imageUrl
  const lowerOcclusalImage = planImages.find(item => item.name === 'lower_occlusal')?.imageUrl
  const panoramicXrayImage = planImages.find(item => item.name === 'panoramic_xray')?.imageUrl


  return (
    <Container>
      <Title text={introText} />
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <section className="flex flex-col items-center mt-10">
        <Title text="Intro Slide" size="md" />
        <div className="w-[842px] h-[595px] relative">
          <img
            src={introImage}
            alt={introImage ? "Intro Image" : settingsPlaceholder}
            className="w-full h-full object-cover"
          />
          <div className="border-[5px] border-white ">
          <p className="absolute left-3 top-1/2">Patient Name: {patientName}</p>
          <p className="absolute left-0 top-[55%]">Doctor: {doctorName}</p>
          </div>
        </div>
        <Title text="Vision Slide" size="md" />
        <div className="w-[842px] h-[595px] relative">
          <img
            src={visionImage}
            alt={visionImage ? "Vision Image" : settingsPlaceholder}
            className="w-full h-full object-cover"
          />
          <p className="absolute right-1/2 top-[30%]">{visionText}</p>
          <p className="absolute right-0 top-[70%]">Doctor: {doctorName}</p>
        </div>

        <Title text="Sides Slide" size="md" />
        <div className="w-[842px] h-[595px] flex justify-between items-end">
          <div className="flex flex-col items-center">
            <img
              src={leftSideImage}
              alt={leftSideImage ? "Left Side Image" : planPlaceholder}
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Left Side</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={rightSideImage}
              alt={rightSideImage ? "Right Side Image" : planPlaceholder}
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Right Side</p>
          </div>
        </div>

        <Title text="Occlusal Slide" size="md" />
        <div className="w-[842px] h-[595px] flex justify-between items-end">
          <div className="flex flex-col items-center">
            <img
              src={lowerOcclusalImage}
              alt={lowerOcclusalImage ? "Lower Occlusal Image" : planPlaceholder}
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Lower Occlusal</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={upperOcclusalImage}
              alt={upperOcclusalImage ? "Upper Occlusal Image" : planPlaceholder}
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Upper Occlusal</p>
          </div>
        </div>

        <Title text="Break Slide" size="md" />
        <div className="w-[842px] h-[595px] relative">
          <img
            src={breakImage}
            alt={breakImage ? "Break Image" : settingsPlaceholder}
            className="w-full h-full object-cover"
          />
          <p className="absolute right-0 top-[70%]">{breakText}</p>
        </div>

        <Title text="X-ray Slide" size="md" />
        <div className="w-[842px] h-[595px] flex flex-col">
          <img
            src={panoramicXrayImage}
            alt={panoramicXrayImage ? "X-ray Image" : planPlaceholder}
            className="w-full object-cover mb-4 h-[300px]"
          />
          <div className="flex justify-between flex-grow">
            <div className="flex-1 text-center p-4">
              <p>{servicesText}</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p>{}</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p>{}</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
