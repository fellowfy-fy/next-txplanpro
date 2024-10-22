import { Title } from "@/components/ui/title";
import { PageDescription } from "@/components/ui/page-description";
// import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import ElementGrid from "@/components/shared/element-grid";
import { BusinessForm } from "@/components/shared/forms/business-form";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
// import { SearchBox } from "@/components/ui/searchbox";

export default async function Settings() {
  // const router = useRouter();
  const session = await getUserSession();
  const sesttingsData = session
    ? await prisma.user.findFirst({
        where: { id: Number(session?.id) },
        include: {
          images: true,
          prices: true,
        },
      })
    : null;

  return (
    <Container>
      <PageDescription
        text="Upload patient diagnostic data, create treatment plan or a DSD project"
        size="sm"
        className="pb-4"
      />

      <Title
        text="dr. JOHN DOE, Smile-clinic Ltd."
        size="lg"
        className="font-bold"
      />

      <ElementGrid>
        <BusinessForm initData={sesttingsData} />
      </ElementGrid>
    </Container>
  );
}
