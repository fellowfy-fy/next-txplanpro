import React from "react";
import IntroSlide from "./slides/intro-slide";
import DescriptionSlide from "./slides/description-slide";
import TeethUpDown from "./slides/teeth-up-down";
import TeethLeftRight from "./slides/teeth-left-right";
import Overview from "./slides/overview";

interface SlidesProps {
  images: { [key: string]: string };
}

const Slides: React.FC<SlidesProps> = ({ images }) => (
  <div className="print-color-exact w-full">
    <IntroSlide
      slideId="intro"
      imageSrc={images["intro"] || "/intro-placeholder.jpg"}
      caption1="Добро пожаловать"
      caption2="Предстыавление проекта"
    />
    <DescriptionSlide
      slideId="description"
      imageSrc={images["description"] || "/description-placeholder.jpg"}
      caption1="Описание проекта"
      caption2="Детали и особенности"
    />
    <TeethUpDown
      slideId="updown"
      imageSrc={images["updown"] || "/description-placeholder.jpg"}
      caption1="Описание проекта"
      caption2="Детали и особенности"
    />
    <TeethLeftRight
      slideId="updown"
      imageSrc={images["updown"] || "/description-placeholder.jpg"}
      caption1="Описание проекта"
      caption2="Детали и особенности"
    />
    {/* <Overview
      slideId="updown"
      imageSrc={images["updown"] || "/description-placeholder.jpg"}
      caption1="Описание проекта"
      caption2="Детали и особенности"
    /> */}
  </div>
);

export default Slides;
