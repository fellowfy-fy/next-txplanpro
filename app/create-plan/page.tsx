import { Title } from "@/components/ui/title";
import { Container } from "@/components/ui/container";
import { CreateView } from "@/components/shared/create-view";

export default function Create() {
  return (
    <Container className="mt-7">
      <Title text="Welcome to Create Page!" size="2xl" className="font-bold" />
      <CreateView/>
    </Container>
  );
}
