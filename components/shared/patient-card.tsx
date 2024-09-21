import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

const patient = {
  name: "Jane Doe.",
  description: "Some description",
  doctor: "Dr. Jane Smith",
  price: 30000,
  presentation: "June 15th, 2023",
  status: "Ready",
};

type CardProps = React.ComponentProps<typeof Card>;

export function PatientCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px] rounded-2xl", className)} {...props}>
      <CardHeader className="relative p-0">
        {/* <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription> */}

        <div className="relative w-full h-[200px] overflow-hidden rounded-t-2xl">
          <Image
            src="/placeholder.jpg"
            layout="fill"
            objectFit="cover"
            alt="Placeholder"
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{patient.name}</p>
            <p className="text-sm text-muted-foreground">
              {patient.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
