"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import DentalFormula from "./dental-formula";
import Photos from "./create-photos";
import TreatmentPlan from "./treatment-plan";
import { NextPrevTab } from "./next-prev-tab";
import { createPlan } from "@/app/dashboard/create-plan/actions";
import { handleFileUpload } from "@/hooks/handle-file-upload";
import { Patient, PatientImage, Plan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { planSchema, TPlanFormValues } from "@/constants/plan-schema";
import { useActivePatient } from "@/store/active-patient";
import { PatientSearch } from "./patient-search";
import { ActivePatient } from "./active-patient";
import { Button } from "../ui/button";

export interface ToothData {
  number: number;
  diagnosis: string[];
  treatments: string[];
  note?: string;
}

export type PatientDTO = Patient & {
  plans?: Plan[];
  images?: PatientImage[];
};

export function CreatePlanForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("dental-formula");
  const { data: session } = useSession();
  const { patient } = useActivePatient()

  const tabs = [
    "dental-formula",
    "photos",
    "treatment-plan",
  ];

  const methods = useForm<TPlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: "Unknown Title",
      teeth: [],
      uploadedFiles: {
        upper_occlusal: null,
        lower_occlusal: null,
        side_left: null,
        side_right: null,
        panoramic_xray: null,
      },
    },
  });

  const handleSubmit = async (data: TPlanFormValues) => {
    try {
      const { title, teeth } = data
      const doctorId = Number(session?.user?.id);
      if (!doctorId) throw new Error("You are not signed in!");

      const result = await createPlan({
        title,
        teeth,
        patientId: Number(patient?.id),
        doctorId,
      });

      await Promise.all(
        Object.entries(data.uploadedFiles).map(async ([key, file]) => {
          if (file) {
            const fileUrl = await handleFileUpload({
              file,
              key,
              planId: result.planId,
              planImage: true
            });
            return { [key]: fileUrl };
          }
          return { [key]: null };
        })
      );

      if (result?.success) {
        alert("Plan created successfully!");
        router.push("/dashboard/patients");
      } else {
        throw new Error("Failed to create plan");
      }
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  };

  return (
    <div className="w-full relative">

      <PatientSearch />
      <ActivePatient />
      {patient &&
      <>
      <NextPrevTab
        goToNextTab={() =>
          setActiveTab(tabs[(tabs.indexOf(activeTab) + 1) % tabs.length])
        }
        goToPreviousTab={() =>
          setActiveTab(
            tabs[(tabs.indexOf(activeTab) - 1 + tabs.length) % tabs.length]
          )
        }
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="p-4">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full bg-[#F8F9FA] rounded-lg shadow-md"
          >
            <center className="sm:pt-5">
              <TabsList className="flex justify-center flex-col sm:flex-row mb-4 border w-auto  gap-8 rounded:sm sm:rounded-full h-auto sm:h-[50px]">
                <TabsTrigger value="dental-formula">
                  1 - Dental formula
                </TabsTrigger>
                <TabsTrigger value="photos">2 - Photos</TabsTrigger>
                <TabsTrigger value="treatment-plan">
                  3 - Treatment Plan
                </TabsTrigger>
              </TabsList>
            </center>

            <TabsContent value="dental-formula">
              <DentalFormula
                handleTeethDataChange={(updatedData: ToothData[]) => {
                  methods.setValue("teeth", updatedData);
                }}
                teethData={methods.watch("teeth")}
              />
            </TabsContent>

            <TabsContent value="photos">
              <Photos
                uploadedFiles={methods.watch("uploadedFiles")}
                onFileUpload={(
                  variant: keyof TPlanFormValues["uploadedFiles"],
                  file: File | null
                ) => {
                  methods.setValue(`uploadedFiles.${variant}`, file);
                }}
                hasLastDragDrop={true}
              />
            </TabsContent>

            <TabsContent value="treatment-plan">
              <TreatmentPlan
                handleTeethDataChange={(updatedData: ToothData[]) => {
                  methods.setValue("teeth", updatedData);
                }}
                teethData={methods.watch("teeth")}
              />
            </TabsContent>
          </Tabs>
          <div className="flex justify-center">
           <Button type="submit" variant="default" className="py-4 px-20 m-3" >Submit</Button>
          </div>
        </form>
      </FormProvider>
      </>
      }
    </div>
  );
}
