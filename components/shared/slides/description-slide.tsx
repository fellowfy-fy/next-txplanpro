import React from "react";

interface IntroSlideProps {
  slideId: string;
  imageSrc: string;
  caption1: string;
  caption2: string;
}

const DescriptionSlide: React.FC<IntroSlideProps> = ({
  slideId,
  imageSrc,
  caption1,
  caption2,
}) => {
  return (
    <div className="intro-slide relative w-full max-w-[297mm] mx-auto print:h-full">
      <div className="aspect-[1.415] relative overflow-hidden">
        <img
          src={imageSrc}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Убираем элементы, которые требуют взаимодействия с пользователем */}
      </div>
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-lg mb-1">{caption1}</p>
        <p className="text-base">{caption2}</p>
      </div>
    </div>
  );
};

export default DescriptionSlide;
