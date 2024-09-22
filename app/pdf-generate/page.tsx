"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Slides from "@/components/shared/slides";

const HomePage: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Мои слайды",
    pageStyle: `
      @page {
        size: A4 landscape; 
        margin: 0;
      }
      @media print {
        body {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
        .slide-container {
          page-break-after: auto;
          page-break-inside: avoid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .slide-container:not(:last-child) {
          page-break-after: always;
        }
      }
    `,
  });

  return (
    <div className="flex flex-col items-center mt-10">
      <Slides ref={componentRef} />
      <button
        onClick={handlePrint}
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Распечатать слайды!
      </button>
    </div>
  );
};

export default HomePage;
