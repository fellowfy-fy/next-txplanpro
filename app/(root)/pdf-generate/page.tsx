"use client";

import React from "react";
import Slides from "@/components/shared/slides";
import { useSlideImagesStore } from "@/store/slideImagesState";

const HomePage: React.FC = () => {
  const { images } = useSlideImagesStore();

  const handleGeneratePDF = async () => {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "slides.pdf";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      alert("Ошибка при генерации PDF");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <Slides images={images} />
      <button
        onClick={handleGeneratePDF}
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Скачать PDF
      </button>
    </div>
  );
};

export default HomePage;
