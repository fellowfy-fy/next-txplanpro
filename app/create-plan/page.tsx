import { Title } from "@/components/ui/title";
import { Container } from "@/components/ui/container";
import TeethDiagram from "@/components/shared/teeth-form";

export default function Create() {
  return (
    <Container className="mt-7">
      <Title text="Welcome to Create Page!" size="2xl" className="font-bold" />
      <TeethDiagram />
    </Container>
  );
}
