import { Container } from "@/components/ui/container";
import { CreateView } from "@/components/shared/create-view";
import { SearchBox } from "@/components/ui/searchbox";
import { PageDescription } from "@/components/ui/page-description";

export default function Create() {
  return (
    <Container>
      <PageDescription
        text="Create a new complex or local segment treatment plan for Your patient"
        size="sm"
        className="pb-4"
      />
      <SearchBox />
      <CreateView />
    </Container>
  );
}
