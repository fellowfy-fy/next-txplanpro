"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image, Smile, Layers } from "lucide-react"; // Импорт иконок из lucide
import clsx from "clsx";

type ActionCardVariant = "complex" | "dsd" | "local"; // Три варианта карточек

interface ActionCardProps {
  variant?: ActionCardVariant; // Вариант карточки
  className?: string;
}

export function ActionCard({ variant = "complex", className }: ActionCardProps) {
  // Логика вариативности карточек
  const cardData = {
    complex: {
      title: "Complex treatment plan",
      description: "Ai - generated, fully customizable. Create fast, professional and visual appealing Dental Treatment Plans online in just several minutes. Increase patient’s trust and your clinic’s brand identity.",
      buttonText: "CREATE",
      Icon: Image,
    },
    dsd: {
      title: "Digital Smile Design",
      description: "The core of your complex planning. Treatment plan, motivate and educate Your patients. Increase case acceptance and Your understanding of Your patient’s clinical needs.",
      buttonText: "CREATE",
      Icon: Smile,
    },
    local: {
      title: "Local (segment) treatment plan",
      description: "Fast and easy. Make presentations even for on-going local treatments.",
      buttonText: "CREATE",
      Icon: Layers,
    },
  };

  // Выбор данных в зависимости от варианта
  const { title, description, buttonText, Icon } = cardData[variant];

  return (
    <Card className={clsx("w-auto bg-[#F8F9FA] rounded-lg shadow-sm h-auto md:h-[300px] flex flex-col justify-between", className)}>
      <CardHeader className="flex items-left space-x-4 text-left">
        <div className="pl-2 pb-2">
          <div className="flex justify-center items-center w-10 h-10 rounded-full border border-blue-500"> {/* Синий контур */}
            <Icon className="w-5 h-5 text-blue-500" /> {/* Синий цвет иконки */}
          </div>
        </div>
        <div>
          <CardTitle className="text-xl font-bold text-left pb-2">{title}</CardTitle>
          <CardDescription className="text-gray-500 text-lg text-left">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="text-left">
        <Button variant="outline" className="w-[150px] h-[40px] text-gray-500">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
