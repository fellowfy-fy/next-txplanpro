import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Shrink } from "lucide-react";

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
  return (
    <Card className={cn("w-auto rounded-2xl bg-[#F8F9FA]", className)} {...props}>
      <CardHeader className="relative p-0">
        {/* <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription> */}

        <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-t-2xl">
          <Image
            src="/placeholder.jpg"
            layout="fill"
            objectFit="cover"
            alt="Placeholder"
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
            <p className="text-lg leading-none">Presentstion: {patient.presentation}</p>
            <p className="text-lg leading-none">Status: {patient.status}</p>
          </div>

      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
