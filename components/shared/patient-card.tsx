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
  doctor: "Dr. Jane Smith",
  price: 30000,
  presentation: "June 15th, 2023",
  status: "Ready",
};

type CardProps = React.ComponentProps<typeof Card>;

export function PatientCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-auto rounded-2xl", className)} {...props}>
      <CardHeader className="relative p-0">
        {/* <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription> */}

        <div className="relative w-full h-[400px] overflow-hidden rounded-t-2xl">
          <Image
            src="/placeholder.jpg"
            layout="fill"
            objectFit="cover"
            alt="Placeholder"
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 mt-5">
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex translate-y-1" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{patient.name}</p>
            <p className="text-sm text-muted-foreground">
              {patient.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
