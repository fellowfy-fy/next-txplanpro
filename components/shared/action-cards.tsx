"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation"; 
import {
  UploadCloud,
  ClipboardList,
  Smile,
  DollarSign,
  Image,
  Layers,
} from "lucide-react"; 
import { cn } from "@/lib/utils";

type ActionCardVariant =
  | "upload"
  | "treatment"
  | "dsd"
  | "payment"
  | "complex"
  | "local"
  | "dsdp"
  | "uploadC"
  | "dental"
  | "team"
  | "texts"; 

interface ActionCardProps {
  variant?: ActionCardVariant;
  className?: string;
}

export function ActionCard({ variant = "upload", className }: ActionCardProps) {
  const router = useRouter(); 

  const cardData = {
    // create
    complex: {
      title: "Complex treatment plan",
      description: "Ai - generated, fully customizable",
      details:
        "Create fast, professional and visual appealing Dental Treatment Plans online in just several minutes. Increase patient's trust and your clinic's brand identity",
      buttonText: ["CREATE"],
      Icon: Image,
      redirectUrl: "/create-plan", 
    },
    dsd: {
      title: "Digital Smile Design projects",
      description: "The core of your complex planning",
      details:
        "Treatment plan, motivate and educate Your patients. Increase case acceptance and Your understanding of Your patient's clinical needs",
      buttonText: ["CREATE", "OPEN"],
      Icon: Smile,
    },
    local: {
      title: "Local (segment) treatment plan",
      description: "Fast and easy",
      details: "Make presentations even for on-going local treatments",
      buttonText: ["CREATE"],
      Icon: Layers,
    },

    // patients
    upload: {
      title: "Upload patient's data",
      description: "Add photos, x-rays or videos to database",
      details:
        "Add as many photos or x-rays of Your patient as You need to create a great looking treatment plan or Digital Smile Design project",
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

    dsdp: {
      title: "Digital Smile Design projects",
      description: "Create new or open existing ",
      details:
        "Make sure You have minimum of 2 good photos in DSD protocol (retractor-photo and smile photo) in the database or on Your device",
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

    // settings
    uploadC: {
      title: "Clinic logo and photos",
      description: "Interior and exterior photos of clinic",
      details:
        "These photos are used in the static part of the treatment plan template, describing and showing Your clinic better for the patient",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
    },

    dental: {
      title: "Dental care photos",
      description: "Surgery/Ortho/Therapy/Prostho",
      details: "Add photos describing best Your clinical care processes",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
    },

    team: {
      title: "Your team",
      description: "Doctors, Admins or Assistants",
      details:
        "Whoever You want to be shown in the template, so that the patient better know Your team",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
    },

    texts: {
      title: "Static texts",
      description: "Describe Your clinic and your care",
      details:
        "Whoever You want to be shown in the template, so that the patient better know Your team",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
    },
  };

  // Проверка, существует ли данный вариант карточки
  const card = cardData[variant];

  if (!card) {
    console.error(`Invalid variant: ${variant}`);
    return null;
  }

  const { title, description, buttonText, Icon, details, redirectUrl } = card;

  // Функция для обработки редиректа
  const handleRedirect = () => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  };

  return (
    <Card
      className={cn(
        "w-auto rounded-2xl bg-[#F8F9FA] cursor-pointer hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      <CardHeader className="flex items-left space-x-4 text-left">
        <div className="flex items-center pb-3">
          <div className="flex justify-center items-center w-10 h-10 rounded-full border border-blue-500">
            <Icon className="w-5 h-5 text-blue-500" />
          </div>
          <CardTitle className="text-xl font-bold ml-3">
            {title}
          </CardTitle>
        </div>

        <div>
          <CardDescription className="text-xl font-bold text-left flex text-black">
            {description}
          </CardDescription>
          {details && (
            <p className="text-md text-gray-400 whitespace-pre-wrap mt-2">
              {details}
            </p>
          )}
        </div>
      </CardHeader>
      <CardFooter className="text-left space-x-2">
        {buttonText.length === 1 ? (
          <Button
            variant="outline"
            className="w-[150px] h-[40px] text-gray-500"
            onClick={handleRedirect}
          >
            {buttonText[0]}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="w-[150px] h-[40px] text-gray-500"
            >
              {buttonText[0]}
            </Button>
            <Button
              variant="outline"
              className="w-[150px] h-[40px] text-gray-500"
            >
              {buttonText[1]}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
