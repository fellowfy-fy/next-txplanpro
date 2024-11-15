"use client";
import * as React from "react";
import { Title } from "@/components/ui/title";
import { PageDescription } from "@/components/ui/page-description";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";
import { DashboardCreate } from "@/components/shared/dashboard-create";
import { PatientCard } from "@/components/shared/patient-card";
import ElementGrid from "@/components/shared/element-grid";

export default function Dashboard() {
  const router = useRouter();

  return (
    <Container>
      <div className="flex justify-between items-center flex-col lg:flex-row">
        <div>
          <Title text="Welcome to TxPlanPro!" size="lg" className="font-bold" />
          <PageDescription
            text="Create fast, professional and visual appealing Dental Treatment Plans online"
            size="sm"
            className="pb-3 lg:pb-0"
          />
        </div>
        <Button
          onClick={() => {
            router.push("/dashboard/create");
          }}
          className="flex items-center"
        >
          <House size={18} className="mr-2" />
          Create new plan
        </Button>
      </div>

      <hr className="my-5" />

      <div>
        <Title
          text="Dr. Doe, here are Your Latest Plans"
          size="sm"
          className="font-bold pb-2"
        />
        <PageDescription
          text="You can download and print the plan for Your patient, or directly send the PDF copy online."
          size="sm"
        />
      </div>

      {/* <ElementGrid> */}
        {/* <PatientCard patients={[]} doctorName={""} />
        <PatientCard patients={[]} doctorName={""} />
        <PatientCard patients={[]} doctorName={""} />
        // <PatientCard patients={[]} doctorName={""} /> */}
      {/* </ElementGrid> */}

      <div className="flex justify-center my-7">
        {/* Редирект с кнопки на /all-plans */}
        <Button
          variant="secondary"
          className="w-[200px] h-[50px]"
          onClick={() => router.push("/dashboard/all-plans")} // Редирект при нажатии на кнопку
        >
          View all plans
        </Button>
      </div>

      <hr className="mb-7" />

      <ElementGrid>
        <DashboardCreate variant="txplan" />
        <DashboardCreate variant="dsd" />
      </ElementGrid>
    </Container>
  );
}
