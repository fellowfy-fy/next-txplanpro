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
import { countTreatments } from "@/lib/format-plan-data";
import { countTreatmentsWithPrices } from "@/lib/format-price-data";

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

  const formattedPrices = countTreatmentsWithPrices(teeth, prices);

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
          <div className=" absolute text-white left-10 top-1/3 ">
            <p className="text-[50px] leading-[50px]">Treatment plan<br />& patient&apos;s clinical guide</p>
            <hr className="mt-3"/>
            <p className="text-[30px] font-thin">Patient Name: <span className="font-semibold">{patientName}</span></p>
            <p className="text-[30px] font-thin">Doctor: <span className="font-semibold">{doctorName}</span></p>
          </div>
        </div>
        <Title text="Vision Slide" size="md" />
        <div className="w-[842px] h-[595px] relative">
          <img
            src={visionImage}
            alt={visionImage ? "Vision Image" : settingsPlaceholder}
            className="w-full h-full object-cover"
          />
          <p className="absolute left-[160px] top-[140px] text-[50px] leading-[50px] text-white text-right">Our<br />Vision &<br />Approach</p>
          <p className="absolute right-56 bottom-56 text-[20px] text-white font-light max-w-[300px]">{visionText}</p>
        </div>

        <Title text="Sides Slide" size="md" />
        <div className="w-[842px] h-[595px] flex flex-col justify-center items-center text-center">
          <p className="text-[30px] font-bold mb-5">DIAGNOSIS<br />VISUALISATION</p>
          <div className=" flex flex-row gap-10 items-end">
            <div className="flex flex-col items-center">
              <p className="text-center text-[30px] font-bold mb-16">UPPER JAW</p>
              <img
                src={leftSideImage}
                alt={leftSideImage ? "Left Side Image" : planPlaceholder}
                className="object-cover mb-2 w-[400px] h-[300px]"
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-center text-[30px] font-bold mb-16">LOWER JAW</p>
              <img
                src={rightSideImage}
                alt={rightSideImage ? "Right Side Image" : planPlaceholder}
                className="object-cover mb-2 w-[400px] h-[300px]"
              />
            </div>
          </div>
        </div>


        <Title text="Occlusal Slide" size="md" />
                <div className="w-[842px] h-[595px] flex flex-col justify-center items-center text-center">
          <p className="text-[30px] font-bold mb-5">DIAGNOSIS<br />VISUALISATION</p>
          <div className=" flex flex-row gap-10 items-end">
            <div className="flex flex-col items-center">
              <p className="text-center text-[30px] font-bold mb-16">LEFT SIDE</p>
         <img
              src={lowerOcclusalImage}
              alt={lowerOcclusalImage ? "Lower Occlusal Image" : planPlaceholder}
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-center text-[30px] font-bold mb-16">RIGHT SIDE</p>
            <img
              src={upperOcclusalImage}
              alt={upperOcclusalImage ? "Upper Occlusal Image" : planPlaceholder}
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            </div>
          </div>
        </div>

        <Title text="Break Slide" size="md" />
        <div className="w-[842px] h-[595px] relative">
          <img
            src={breakImage}
            alt={breakImage ? "Break Image" : settingsPlaceholder}
            className="w-full h-full object-cover"
          />
            <p className="absolute text-[32px] font-bold leading-8 right-24 bottom-72">Surgical & Implant<br />Treatment</p>
            <p className="absolute text-[24px] leading-6 right-20 bottom-60 font-light w-[295px]">{breakText}</p>
        </div>

        <Title text="X-ray Slide" size="md" />
        <div className="w-[842px] h-[595px] flex flex-col">
          <img
            src={panoramicXrayImage}
            alt={panoramicXrayImage ? "X-ray Image" : planPlaceholder}
            className="w-full object-cover mb-4 h-[300px]"
          />
          <div className="flex justify-between flex-grow">
            <div className="flex-1 text-left p-4">
              <p className="text-[20px] leading-6 font-bold mb-3">SURGICAL & IMPLANT<br />TREATMENT</p>
              <p>{servicesText}</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p className="text-[20px] leading-6 font-bold mb-3">PROCEDURES</p>
              {countTreatments(teeth).map(item => (
                <div key={item.name} className="flex justify-between mb-1">
                  <span>{item.name}</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 text-center p-4">
              <p className="text-[20px] leading-6 font-bold mb-3">FINANCIAL PLAN</p>
              {formattedPrices.map(item => (
              <div className="text-left" key={item.name}>
                {item.name} (${item.pricePerUnit} × {item.count}) = ${item.totalPrice}
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
