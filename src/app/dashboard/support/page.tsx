import { SupportForm } from "@/components/shared/support-form";
import { SupportContacts } from "@/components/ui/support-contacts";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { PageDescription } from "@/components/ui/page-description";
import { MapComponent } from "@/components/ui/map";

export default function SupportPage() {
  return (
    <Container className="max-w-[1000px]">
      <Title text="Contact Us" size="lg" className="font-semibold" />
      <PageDescription text="Reach out with your questions and feedback. We're here to help with any inquiries you have." size="sm" className="pb-4"/>
      <div className="flex flex-col md:flex-row gap-6 mt-6 justify-between">
        <SupportContacts />
        <SupportForm />
      </div>
      <Title text="Map" size="md" className="font-semibold pb-4" />
      <MapComponent/>
    </Container>
  );
}
