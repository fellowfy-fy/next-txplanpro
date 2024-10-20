"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Patient } from "@prisma/client";
import { Button } from "../ui/button";

interface PatientCardProps {
  patients: Patient[];
  doctorName: string;
  className?: string;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  className,
  patients,
  doctorName,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card>
      {/* <CardHeader className="relative p-0">
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
      </CardHeader> */}
      {patients.map((patient) => (
        <CardContent className="grid gap-4 mt-5" key={patient.id}>
          <div>
            <span className="flex translate-y-1" />
            <div className="space-y-1">
              <p className="text-xl font-bold leading-none pb-2">
                Patient: {patient.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                {String(patient.birthDate)}
              </p>
              <p className="text-sm text-muted-foreground">{patient.address}</p>
            </div>
          </div>
          <hr />
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg leading-none flex flex-row">
              by dr. {doctorName}
            </p>
          </div>
          <hr />
          <div className="flex flex-row justify-between items-center"></div>
        </CardContent>
      ))}
      <CardFooter>
        <Button
          variant="default"
          onClick={() => {
            router.push("/pdf");
          }}
        >
          Create Plan
        </Button>
      </CardFooter>
    </Card>
  );
};
