import { BackButton } from "@/components/ui/back-button";
import { PatientCover } from "@/components/ui/patient-cover";
import { PlanDetails } from "@/components/shared/plan-details";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function PatientPlan() {
  return (
    <Container className="max-w-[1100px]">
      <BackButton />
      <PatientCover />
      <div className="flex flex-col md:flex-row gap-6 mt-6 justify-between">
        <div className="md:col-span-2 space-y-4 max-w-[600px]">
          <p className="text-lg font-semibold">Patient: Johanna Doe</p>
          <p>
            Missing teeth in upper and lower molars, Discoloured teeth, Worn
            dentition: Attrition due to improper bite, Multiple caries,
            Endodontic compromise, Secondary tooth deformation: Malalignment may
            require orthodontic treatment to achieve optimal aesthetics and
            function.
          </p>
          <div className="flex  flex-col gap-4">
            <Button
              variant="secondary"
              className="w-full md:w-[200px] h-[50px]"
            >
              View plan
            </Button>
            <Button
              variant="secondary"
              className="w-full md:w-[200px] h-[50px]"
            >
              Edit plan
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <PlanDetails />
          <Button variant="outline" className="w-full h-[50px]">
            Next plan
          </Button>
        </div>
      </div>
    </Container>
  );
}
