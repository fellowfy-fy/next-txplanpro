import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto w-[80%] max-w-[1400px] my-7 bg-white p-5 rounded-[15px]", className)}>{children}</div>
  );
};
