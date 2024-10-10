"use client";
import { Title } from "@/components/ui/title";
import { PageDescription } from "@/components/ui/page-description";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import ElementGrid from "@/components/shared/element-grid";
import { ActionCard } from "@/components/shared/action-cards";
import { SearchBox } from "@/components/ui/searchbox";

export default function Settings() {
  const router = useRouter();

  const patient = {
  name: "Jane Doe",
  };

  return (
    <Container>
      <PageDescription text="Upload patient diagnostic data, create treatment plan or a DSD project" size="sm" className="pb-4"/>

      <Title text="dr. JOHN DOE, Smile-clinic Ltd." size="lg" className="font-bold" />
      
      <ElementGrid>
        <ActionCard variant="uploadC" />
        <ActionCard variant="dental" />
        <ActionCard variant="team" />
        <ActionCard variant="texts" />
      </ElementGrid>

    </Container>
  );
}