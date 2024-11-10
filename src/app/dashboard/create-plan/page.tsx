'use client'
import { Container } from "@/components/ui/container";
import { CreatePlanForm } from "@/components/shared/create-plan-form";
import { PageDescription } from "@/components/ui/page-description";

export default function Create() {
  return (
    <Container>
      <PageDescription
        text="Create a new complex or local segment treatment plan for Your patient"
        size="sm"
        className="pb-4"
      />
      <CreatePlanForm />
    </Container>
  );
}
