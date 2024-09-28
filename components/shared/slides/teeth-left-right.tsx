import React from "react";

interface TeethLeftRightProps {
  upperJawImgSrc: string;
  lowerJawImgSrc: string;
  upperJawDiagnosis: string;
  lowerJawDiagnosis: string;
}

const TeethLeftRight: React.FC<TeethLeftRightProps> = ({
  upperJawImgSrc,
  lowerJawImgSrc,
  upperJawDiagnosis,
  lowerJawDiagnosis,
}) => {
  return (
    <div className="w-full max-w-[297mm] mx-auto flex flex-col items-center print:h-full">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold text-center mb-4">Diagnosis Visualisation</h1>

      <div className="flex justify-between w-full">
        {/* Левая часть - верхняя челюсть */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Upper Jaw</h2>
          <p className="text-center mb-2">{upperJawDiagnosis}</p>
          <img
            src="/left-side.png"
            alt="Upper Jaw"
            className="w-full object-cover"
          />
        </div>

        {/* Правая часть - нижняя челюсть */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Lower Jaw</h2>
          <p className="text-center mb-2">{lowerJawDiagnosis}</p>
          <img
          src="/right-side.png"
            alt="Lower Jaw"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TeethLeftRight;
