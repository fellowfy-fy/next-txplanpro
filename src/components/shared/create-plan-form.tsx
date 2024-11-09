"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { NextPrevTab } from "./next-prev-tab";
import { createPlan } from "@/app/dashboard/create-plan/actions";
import { handleFileUpload } from "@/hooks/handle-file-upload";
import { Patient, PatientImage, Plan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { planSchema, TPlanFormValues } from "@/constants/plan-schema";
import { useActivePatient } from "@/store/active-patient";
import { PatientSearch } from "./patient-search";
import { ActivePatient } from "./active-patient";
import toast from 'react-hot-toast';
import { PlanForm } from "./plan-form";


export interface ToothData {
  id?: number;
  number: number;
  diagnosis: string[];
  planId?: number;
  treatments: string[];
  note?: string | null;
}

export type PatientDTO = Patient & {
  plans?: Plan[];
  images?: PatientImage[];
};

export function CreatePlanForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("dental-formula");
  const { data: session } = useSession();
  const { patient } = useActivePatient();

  const tabs = [
    "dental-formula",
    "photos",
    "treatment-plan",
  ];

  const methods = useForm<TPlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: "Unknown",
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
        toast.success(`Plan ${data.title} created successfully!`, {
          position: 'bottom-right',
          duration: 3000,
        });
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
          <PlanForm activeTab={activeTab} setActiveTab={setActiveTab} />
        </form>
      </FormProvider>
      </>
      }
    </div>
  );
}
