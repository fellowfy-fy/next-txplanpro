import { Title } from "@/components/shared/title";
import { Container } from "@/components/shared/container";
import TeethDiagram from "@/components/shared/teeth-form";

export default function Home() {
  return (
    <Container className="mt-7">
      <Title text="Welcome to Create Page!" size="2xl" className="font-bold" />
      <TeethDiagram />
    </Container>
  );
}
