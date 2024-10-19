"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import DentalFormula from "./dental-formula";
import Photos from "./create-photos";
import TreatmentPlan from "./treatment-plan";
import { PatientInfoForm } from "./forms/patient-info-form";
import { TPatientFormValues, patientSchema } from "@/constants/patient-schema";
import { NextPrevTab } from "./next-prev-tab";
import { createPatient } from "@/app/(root)/create-plan/actions";
import { handleFileUpload } from "@/hooks/handle-file-upload";

export interface ToothData {
  number: number;
  diagnosis: string[];
  treatments: string[];
  note?: string;
}

export function CreateView() {
  const [activeTab, setActiveTab] = React.useState("patient-info");
  const { data: session } = useSession();

  const tabs = ["patient-info", "dental-formula", "photos", "treatment-plan"];

  const methods = useForm<TPatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: "",
      address: "",
      birthDate: "",
      teethData: [],
      uploadedFiles: {
        upper_occlusal: null,
        lower_occlusal: null,
        side_left: null,
        side_right: null,
        panoramic_xray: null,
      },
    },
  });

  const handleSubmit = async (data: TPatientFormValues) => {
    try {
      const doctorId = Number(session?.user?.id);
      if (!doctorId) throw new Error("Doctor not found");

      const result = await createPatient({
        fullName: data.fullName,
        address: data.address,
        birthDate: data.birthDate,
        teethData: data.teethData,
        doctorId,
      });

      const uploadedFileUrls = await Promise.all(
        Object.entries(data.uploadedFiles).map(async ([key, file]) => {
          if (file) {
            const fileUrl = await handleFileUpload(file, result.patientId);
            return { [key]: fileUrl };
          }
          return { [key]: null };
        })
      );

      if (result?.success) {
        alert("Patient created successfully!");
      } else {
        throw new Error("Failed to create patient");
      }
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return (
    <div>
      <NextPrevTab
        activeTab={activeTab}
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
            className="w-full bg-[#F8F9FA] rounded-lg shadow-md"
          >
            <center className="sm:pt-5">
              <TabsList className="flex justify-center flex-col sm:flex-row mb-4 border w-auto sm:w-[700px] gap-8 rounded:sm sm:rounded-full h-auto sm:h-[50px]">
                <TabsTrigger value="patient-info">1 - Patient Info</TabsTrigger>
                <TabsTrigger value="dental-formula">
                  2 - Dental formula
                </TabsTrigger>
                <TabsTrigger value="photos">3 - Photos</TabsTrigger>
                <TabsTrigger value="treatment-plan">
                  4 - Treatment Plan
                </TabsTrigger>
              </TabsList>
            </center>

            <TabsContent value="patient-info">
              <PatientInfoForm />
            </TabsContent>

            <TabsContent value="dental-formula">
              <DentalFormula
                handleTeethDataChange={(updatedData: ToothData[]) => {
                  methods.setValue("teethData", updatedData);
                }}
                teethData={methods.watch("teethData")}
              />
              <pre>{JSON.stringify(methods.watch("teethData"), null, 2)}</pre>
            </TabsContent>

            <TabsContent value="photos">
              <Photos
                uploadedFiles={methods.watch("uploadedFiles")}
                onFileUpload={(
                  variant: keyof TPatientFormValues["uploadedFiles"],
                  file: File | null
                ) => {
                  methods.setValue(`uploadedFiles.${variant}`, file);
                }}
              />
            </TabsContent>

            <TabsContent value="treatment-plan">
              <TreatmentPlan
                handleTeethDataChange={(updatedData: ToothData[]) => {
                  methods.setValue("teethData", updatedData);
                }}
                teethData={methods.watch("teethData")}
              />
            </TabsContent>

            {/* Кнопка для сабмита */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
}
