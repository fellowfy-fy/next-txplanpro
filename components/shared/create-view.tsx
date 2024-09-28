"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DentalFormula from "./dental-formula";
import Guidelines from "./create-guidelines";
import Photos from "./create-photos";
import TreatmentPlan from "./treatment-plan";


export function CreateView() {
  return (
    <div className="p-4">
      <Tabs defaultValue="dental-formula" className="w-full bg-[#F8F9FA] rounded-lg shadow-md">
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger value="dental-formula">1 - Dental formula</TabsTrigger>
          <TabsTrigger value="guidelines">2 - Guidelines</TabsTrigger>
          <TabsTrigger value="photos">3 - Photos</TabsTrigger>
          <TabsTrigger value="treatment-plan">4 - Treatment Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="dental-formula">
          <DentalFormula />
        </TabsContent>

        <TabsContent value="guidelines">
          <Guidelines />
        </TabsContent>

        <TabsContent value="photos">
          <Photos />
        </TabsContent>

        <TabsContent value="treatment-plan">
          <TreatmentPlan />
        </TabsContent>
      </Tabs>
    </div>
  );
}
