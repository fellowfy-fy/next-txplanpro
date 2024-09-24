"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const patient = {
  name: "Jane Doe.",
  description: "Missing teeth in upper and lower molars, Discoloured teeth, Worn dentition: Attrition due to improper bite, Multiple caries, Endodontic compromise Secondary tooth deformation: Malalignment may require orthodontic treatment to achieve optimal aesthetics and function.",
  doctor: "Jane Smith",
  price: "30 990",
  presentation: "June 15th, 2023",
  status: "Ready",
};

type CardProps = React.ComponentProps<typeof Card>;

export function PatientCard({ className, ...props }: CardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push("/patient-plan");
  };

  return (
    <Card
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("w-auto rounded-2xl bg-[#F8F9FA] cursor-pointer hover:shadow-lg transition-shadow duration-300", className)}
      {...props}
    >
      <CardHeader className="relative p-0">
        <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-t-2xl">
          <Image
            src="/placeholder.jpg"
            layout="fill"
            objectFit="cover"
            alt="Placeholder"
            className={cn(
              "transition-transform duration-300 ease-in-out",
              isHovered ? "scale-110" : "scale-100"
            )}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 mt-5">
        <div>
          <span className="flex translate-y-1" />
          <div className="space-y-1">
            <p className="text-xl font-bold leading-none pb-2">Patient: {patient.name}</p>
            <p className="text-sm text-muted-foreground">
              {patient.description}
            </p>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg leading-none flex flex-row">by dr. {patient.doctor}</p>
          <p className="text-lg font-bold leading-none">{patient.price}$</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg leading-none">Presentation: {patient.presentation}</p>
          <p className="text-lg leading-none">Status: {patient.status}</p>
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
