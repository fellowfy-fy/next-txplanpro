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
import { UploadCloud, ClipboardList, Smile, FileText, DollarSign, Image, Layers } from "lucide-react"; // Импорт нужных иконок
import clsx from "clsx";

type ActionCardVariant = "upload" | "treatment" | "dsd" | "payment" | "insurance" | "complex" | "local"; // Варианты карточек

interface ActionCardProps {
  variant?: ActionCardVariant; // Вариант карточки
  className?: string;
}

export function ActionCard({ variant = "upload", className }: ActionCardProps) {
  // Логика вариативности карточек
  const cardData = {
    upload: {
      title: "Upload patient's data",
      description: "Add photos, x-rays or videos to database. Add as many photos or x-rays of Your patient as You need to create a great looking treatment plan or Digital Smile Design project.",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
    },
    treatment: {
      title: "Treatment Plans",
      description: "Create new or open existing",
      details: "To-do (1)\nReady to present (0)\nAccepted (0)",
      buttonText: ["CREATE", "OPEN"],
      Icon: ClipboardList,
    },
    dsd: {
      title: "Digital Smile Design projects",
      description: "Create new or open existing",
      details: "Make sure You have minimum of 2 good photos in DSD protocol (retractor-photo and smile photo) in the database or on Your device.",
      buttonText: ["CREATE", "OPEN"],
      Icon: Smile,
    },
    payment: {
      title: "Payments and insurance",
      description: "Invoices and other documents",
      details: "All (1)\nPaid (1)\nPending (0)",
      buttonText: ["CREATE", "OPEN"],
      Icon: DollarSign,
    },
    complex: {
      title: "Complex treatment plan",
      description: "Ai - generated, fully customizable. Create fast, professional and visual appealing Dental Treatment Plans online in just several minutes. Increase patient’s trust and your clinic’s brand identity.",
      buttonText: ["CREATE"],
      Icon: Image,
    },
    local: {
      title: "Local (segment) treatment plan",
      description: "Fast and easy. Make presentations even for on-going local treatments.",
      buttonText: ["CREATE"],
      Icon: Layers,
    },
    insurance: {
      title: "Invoices and insurance",
      description: "Manage and process invoices and other related documents.",
      buttonText: ["CREATE", "OPEN"],
      Icon: FileText,
    },
  };

  // Проверка, существует ли данный вариант карточки
  const card = cardData[variant];

  if (!card) {
    console.error(`Invalid variant: ${variant}`);
    return null;
  }

  const { title, description, buttonText, Icon, details } = card;

  return (
    <Card className={clsx("w-auto bg-[#F8F9FA] rounded-lg shadow-sm h-auto md:h-[300px] flex flex-col justify-between", className)}>
      <CardHeader className="flex items-left space-x-4 text-left">
        <div className="pl-2 pb-2">
          <div className="flex justify-center items-center w-10 h-10 rounded-full border border-blue-500">
            <Icon className="w-5 h-5 text-blue-500" /> {/* Иконка на основе варианта */}
          </div>
        </div>
        <div>
          <CardTitle className="text-xl font-bold text-left pb-2">{title}</CardTitle>
          <CardDescription className="text-gray-500 text-lg text-left">
            {description}
          </CardDescription>
          {details && (
            <p className="text-sm text-gray-400 whitespace-pre-wrap mt-2">
              {details}
            </p>
          )}
        </div>
      </CardHeader>
      <CardFooter className="text-left space-x-2">
        {buttonText.length === 1 ? (
          <Button variant="outline" className="w-[150px] h-[40px] text-gray-500">
            {buttonText[0]}
          </Button>
        ) : (
          <>
            <Button variant="outline" className="w-[150px] h-[40px] text-gray-500">
              {buttonText[0]}
            </Button>
            <Button variant="outline" className="w-[150px] h-[40px] text-gray-500">
              {buttonText[1]}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
