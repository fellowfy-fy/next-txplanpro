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
import { Bookmark, Circle } from "lucide-react"; // Импорт иконок из lucide
import clsx from "clsx";

type DashboardCreateVariant = "txplan" | "dsd"; // Типы карточек

interface DashboardCreateProps {
  variant?: DashboardCreateVariant; // Вариант карточки (TxPlan или DSD)
  className?: string;
}

export function DashboardCreate({ variant = "txplan", className }: DashboardCreateProps) {
  // Логика вариативности карточек
  const cardData = {
    txplan: {
      title: "CREATE NEW TxPlan",
      description: "Create a treatment plan for a new or existing patient (mostly for local cases)",
      buttonText: "Create Plan",
      Icon: Circle,
    },
    dsd: {
      title: "CREATE NEW Digital Smile Design project",
      description: "Start a new plan from a DSD project (mostly for complex cases)",
      buttonText: "Create DSD",
      Icon: Bookmark,
    },
  };

  // Выбор данных в зависимости от варианта
  const { title, description, buttonText, Icon } = cardData[variant];

  return (
    <Card className={clsx("w-auto bg-[#F8F9FA] rounded-lg shadow-sm", className)}>
      <CardHeader className="flex items-left space-x-4 text-left"> 
        <div className="pl-2 pb-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-300">
                <Icon className="w-5 h-5 text-gray-400" /> 
            </div>
        </div>
        <div>
          <CardTitle className="text-xl font-bold text-left pb-2">{title}</CardTitle> 
          <CardDescription className="text-gray-500 text-lg text-left"> 
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className=" text-left">
        <Button variant="outline" className="w-[200px] h-[50px] text-gray-500">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
