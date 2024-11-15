import clsx from "clsx";
import React from "react";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const PageDescription: React.FC<Props> = ({
  text,
  size = "sm",
  className,
}) => {
  const mapTagBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
  } as const;

  const mapClassNameBySize = {
    xs: "text-[18px]",
    sm: "text-[20px]",
    md: "text-[26px]",
    lg: "text-[32px]",
    xl: "text-[40px]",
    "2xl": "text-[48px]",
  } as const;

  return React.createElement(
    mapTagBySize[size],
    {
      className: clsx(
        mapClassNameBySize[size],
        "text-[#A4A4A4]",
        "font-light",
        className
      ),
    },
    text
  );
};
