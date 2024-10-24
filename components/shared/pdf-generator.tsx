"use client";
import React from "react";
import { Container } from "../ui/container";
import { Button } from "../ui/button";
import { Title } from "../ui/title";
import { pdfContent } from "@/constants/pdf"; 

export default function PdfGenerator() {
  const handleDownloadPDF = async () => {
    const response = await fetch("/api/generate-pdf");
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

  const { images, texts } = pdfContent;

  return (
    <Container>
      <Title text={texts.pageTitle} />
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <section className="flex flex-col items-center mt-10">
        <div className="w-[842px] h-[595px] relative">
          <img src={images.intro} alt="" className="w-full h-full object-cover" />
          <p className="absolute left-0 top-1/2">{texts.patientStatus}</p>
          <p className="absolute left-0 top-[55%]">{texts.patientStatus}</p>
        </div>

        <div className="w-[842px] h-[595px] relative">
          <img src={images.description} alt="" className="w-full h-full object-cover" />
          <p className="absolute right-1/2 top-[30%]">{texts.patientStatus}</p>
          <p className="absolute right-0 top-[70%]">{texts.patientStatus}</p>
        </div>

        <div className="w-[842px] h-[595px] flex justify-between items-end">
          <div className="flex flex-col items-center">
            <img
              src={images.leftSide}
              alt=""
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">{texts.leftSideLabel}</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={images.rightSide}
              alt=""
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">{texts.rightSideLabel}</p>
          </div>
        </div>

        <div className="w-[842px] h-[595px] flex justify-between items-end">
          <div className="flex flex-col items-center">
            <img
              src={images.lowerJaw}
              alt=""
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">{texts.lowerSideLabel}</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={images.upperJaw}
              alt=""
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">{texts.upperSideLabel}</p>
          </div>
        </div>

        <div className="w-[842px] h-[595px] relative">
          <img src={images.description} alt="" className="w-full h-full object-cover" />
          <p className="absolute right-0 top-[70%]">{texts.patientStatus}</p>
        </div>

        <div className="w-[842px] h-[595px] flex flex-col">
          <img
            src={images.xray}
            alt=""
            className="w-full object-cover mb-4 h-[300px]"
          />
          <div className="flex justify-between flex-grow">
            <div className="flex-1 text-center p-4">
              <p>{texts.columnOne}</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p>{texts.columnTwo}</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p>{texts.columnThree}</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}