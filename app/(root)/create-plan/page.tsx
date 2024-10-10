import { Title } from "@/components/ui/title";
import { Container } from "@/components/ui/container";
import { CreateView } from "@/components/shared/create-view";
import { SearchBox } from "@/components/ui/searchbox";
import { PageDescription } from "@/components/ui/page-description";

export default function Create() {
  return (
    <Container className="mt-7">
      <PageDescription text="Create a new complex or local segment treatment plan for Your patient" size="sm" className="pb-4"/>
      <SearchBox/>
      <Title text="Patient: Jane Doe" size="lg" className="font-bold pt-2" />
      <CreateView/>
    </Container>
  );
}