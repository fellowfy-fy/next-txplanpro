"use client";
import { Title } from "@/components/ui/title";
import { PageDescription } from "@/components/ui/page-description";
import { Container } from "@/components/shared/container";
import PatientGrid from "@/components/shared/patient-grid";
import { Button } from "@/components/ui/button";
import { House, Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <Container>
      <div className="flex row">
        <div>
        <Title text="Welcome to TxPlanPro!" size="xl" className="font-bold" />
        <PageDescription text="Create fast, professional and visual appealing Dental Treatment Plans online" size="sm"/>
        </div>
        <Button onClick={() => {router.push("/create");}}>
          <House size={18} className="mr-2"/> Create new plan</Button>
      </div>
        <hr className="mt-5"/>
          <PatientGrid/>
    </Container>
  );
}
