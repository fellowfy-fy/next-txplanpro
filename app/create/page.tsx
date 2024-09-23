"use client";
import { Title } from "@/components/ui/title";
import { PageDescription } from "@/components/ui/page-description";
import { useRouter } from "next/navigation";
import { Container } from "@/components/shared/container";
import ElementGrid from "@/components/shared/element-grid";
import { ActionCard } from "@/components/shared/action-cards";
import { SearchBox } from "@/components/ui/searchbox";

export default function Create() {
  const router = useRouter();

  const patient = {
  name: "Jane Doe",
  };

  return (
    <Container>
      <Title text="Patient: Jane Doe" size="lg" className="font-bold" />
      <PageDescription text="Upload patient diagnostic data, create treatment plan or a DSD project" size="sm" className="pb-4"/>

      <SearchBox/>

      <Title text="Create your new..." size="lg" className="font-bold pt-3" />
      
      <ElementGrid>
        <ActionCard variant="complex" />
        <ActionCard variant="dsd" />
        <ActionCard variant="local" />
      </ElementGrid>

    </Container>
  );
}