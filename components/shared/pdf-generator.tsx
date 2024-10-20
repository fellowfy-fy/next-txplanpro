"use client";

import React from "react";
import { Container } from "../ui/container";
import { Button } from "../ui/button";
import { Title } from "../ui/title";

const images = [
  "/intro-placeholder.jpg",
  "/description-placeholder.jpg",
  "/left-side.png",
  "/right-side.png",
  "/lower-jaw.png",
  "/upper-jaw.png",
  "/xray.png",
];

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

  return (
    <Container>
      <Title text="Preview of PDF Plan" />
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <section className="flex flex-col items-center mt-10">
        <div className="w-[842px] h-[595px] relative">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
          <p className="absolute left-0 top-1/2">Patient LOL ready for duty</p>
          <p className="absolute left-0 top-[55%]">
            Patient LOL ready for duty
          </p>
        </div>
        <div className="w-[842px] h-[595px] relative">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
          <p className="absolute right-1/2 top-[30%]">
            Patient LOL ready for duty
          </p>
          <p className="absolute right-0 top-[70%]">
            Patient LOL ready for duty
          </p>
        </div>
        <div className="w-[842px] h-[595px] flex justify-between items-end">
          <div className="flex flex-col items-center">
            <img
              src={images[2]}
              alt=""
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Left Side</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={images[3]}
              alt=""
              className="object-cover mb-2  w-[400px] h-[300px]"
            />
            <p className="text-center">Right Side</p>
          </div>
        </div>
        <div className="w-[842px] h-[595px] flex justify-between items-end">
          <div className="flex flex-col items-center">
            <img
              src={images[4]}
              alt=""
              className="object-cover mb-2 w-[400px] h-[300px]"
            />
            <p className="text-center">Lower Side</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={images[5]}
              alt=""
              className="object-cover mb-2  w-[400px] h-[300px]"
            />
            <p className="text-center">Upper Side</p>
          </div>
        </div>
        <div className="w-[842px] h-[595px] relative">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
          <p className="absolute right-0 top-[70%]">
            Patient LOL ready for duty
          </p>
        </div>
        <div className="w-[842px] h-[595px] flex flex-col">
          {/* Картинка сверху на всю ширину */}
          <img
            src={images[6]}
            alt=""
            className="w-full object-cover mb-4 h-[300px]"
          />

          {/* Три столбца с текстом */}
          <div className="flex justify-between flex-grow">
            <div className="flex-1 text-center p-4">
              <p>Text in Column 1</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p>Text in Column 2</p>
            </div>
            <div className="flex-1 text-center p-4">
              <p>Text in Column 3</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
