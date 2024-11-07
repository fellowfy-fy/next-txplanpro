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
import { cardData } from "@/constants/card-data";
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

export function ActionCard({ variant = "texts", className }: ActionCardProps) {
  const router = useRouter();
  const card: Card = cardData[variant];

  if (!card) {
    console.error(`Invalid variant: ${variant}`);
    return null;
  }

  const {
    title,
    description,
    buttonText,
    Icon,
    details,
    redirectUrlFirst,
    redirectUrlSecond,
  } = card;

  // Функции для обработки редиректа
  const handleRedirectFirst = () => {
    if (redirectUrlFirst) {
      router.push(redirectUrlFirst);
    }
  };

  const handleRedirectSecond = () => {
    if (redirectUrlSecond) {
      router.push(redirectUrlSecond);
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
          <CardTitle className="text-xl font-bold ml-3">{title}</CardTitle>
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
            onClick={handleRedirectFirst}
          >
            {buttonText[0]}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="w-[150px] h-[40px] text-gray-500"
              onClick={handleRedirectFirst}
            >
              {buttonText[0]}
            </Button>
            <Button
              variant="outline"
              className="w-[150px] h-[40px] text-gray-500"
              onClick={handleRedirectSecond}
            >
              {buttonText[1]}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
