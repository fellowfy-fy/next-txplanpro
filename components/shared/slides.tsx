import React from "react";
import IntroSlide from "./slides/intro-slide";
import DescriptionSlide from "./slides/description-slide";

interface SlidesProps {
  images: { [key: string]: string };
}

const Slides: React.FC<SlidesProps> = ({ images }) => (
  <div className="print-color-exact w-full">
    <IntroSlide
      slideId="intro"
      imageSrc={images["intro"] || "/intro-placeholder.jpg"}
      caption1="Добро пожаловать"
      caption2="Представление проекта"
    />
    <DescriptionSlide
      slideId="description"
      imageSrc={images["description"] || "/description-placeholder.jpg"}
      caption1="Описание проекта"
      caption2="Детали и особенности"
    />
  </div>
);

export default Slides;
