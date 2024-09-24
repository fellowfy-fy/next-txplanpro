"use client";
import { Title } from "@/components/ui/title";
import { Container } from "@/components/ui/container";
import { useRouter } from "next/navigation";
import { PatientCard } from "@/components/shared/patient-card";
import ElementGrid from "@/components/shared/element-grid";
import { Button } from "@/components/ui/button";

export default function ToDoPlans() {
  const router = useRouter();

  return (
    <Container>
      <Title text="Your To-Do Plans" size="xl" className="font-bold" />

      <div className="flex flex-row sm:justify-start justify-center gap-2 py-4">
        {/* Кнопка "All plans" с редиректом на /all-plans */}
        <Button
          variant="outline"
          className="w-[150px] h-[40px] text-gray-500"
          onClick={() => router.push("/all-plans")}
        >
          All plans
        </Button>

        {/* Кнопка "Create plan" с редиректом на /create */}
        <Button
          variant="secondary"
          className="w-[150px] h-[40px]"
          onClick={() => router.push("/create")}
        >
          Create plan
        </Button>
      </div>

      <ElementGrid>
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </ElementGrid>

    </Container>
  );
}
