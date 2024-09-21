import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  icon?: LucideIcon;
  className?: string;
  menuClassName?: string;
  onClick?: () => void;
}

export const MenuItem: React.FC<Props> = ({
  className,
  menuClassName,
  title,
  icon: Icon,
  onClick,
}) => {
  return (
    <Button
      className={cn("flex my-3 gap-1 w-full justify-start", menuClassName)}
      onClick={onClick}
    >
      {Icon && <Icon className={className} />}
      {title}
    </Button>
  );
};
