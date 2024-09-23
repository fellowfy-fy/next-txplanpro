"use client";
import { Title } from "@/components/ui/title";
import { PageDescription } from "@/components/ui/page-description";
import { useRouter } from "next/navigation";
import { Container } from "@/components/shared/container";
import ElementGrid from "@/components/shared/element-grid";
import { ActionCard } from "@/components/shared/action-cards";
import { SearchBox } from "@/components/ui/searchbox";

export default function Patients() {
  const router = useRouter();

  const patient = {
  name: "Jane Doe",
  };

  return (
    <Container>
      <PageDescription text="Upload patient diagnostic data, create treatment plan or a DSD project" size="sm" className="pb-4"/>

      <SearchBox/>

      <Title text="Patient: Jane Doe" size="lg" className="font-bold pt-3" />
      
      <ElementGrid>
        <ActionCard variant="upload" />
        <ActionCard variant="treatment" />
        <ActionCard variant="payment" />
        <ActionCard variant="insurance" />
      </ElementGrid>

    </Container>
  );
}