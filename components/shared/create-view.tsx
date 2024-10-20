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
import { SearchBox } from "../ui/searchbox";
import { useClickAway, useDebounce } from "react-use";
import { Api } from "@/services/api-client";
import { Patient, PatientImage, Tooth } from "@prisma/client";
import { cn } from "@/lib/utils";
import { convertUrlsToFiles } from "./convert-urls-to-file";
import { PatientSubmitInfo } from "./patient-submit-info";

export interface ToothData {
  number: number;
  diagnosis: string[];
  treatments: string[];
  note?: string;
}

export type PatientDTO = Patient & {
  teeth?: Tooth[];
  images?: PatientImage;
};

export function CreateView() {
  const [activeTab, setActiveTab] = React.useState("patient-info");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [patientData, setPatientData] = React.useState<Patient[]>([]);
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);
  const { data: session } = useSession();

  const tabs = ["patient-info", "dental-formula", "photos", "treatment-plan"];

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
  };

  useClickAway(ref, () => {
    setFocused(false);
  });

  const onClickPatient = (patient: PatientDTO) => {
    return async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (patient) {
        setFocused(false);

        methods.setValue("fullName", patient.fullName);
        methods.setValue("address", patient.address);
        const formattedBirthDate = new Date(patient.birthDate)
          .toISOString()
          .split("T")[0];
        methods.setValue("birthDate", formattedBirthDate);
        if (patient.teeth) {
          const formattedTeethData = patient.teeth.map((tooth) => ({
            number: tooth.number,
            diagnosis: tooth.diagnoses,
            treatments: tooth.treatment,
            note: tooth.note || undefined,
          }));

          methods.setValue("teethData", formattedTeethData);
        }
        if (patient.images) {
          const uploadedFiles = await convertUrlsToFiles(patient);
          methods.setValue("uploadedFiles", uploadedFiles);
        }
      }
    };
  };

  useDebounce(
    async () => {
      try {
        const doctorId = Number(session?.user?.id);
        const patientData = await Api.patients.search(searchQuery, doctorId);

        setPatientData(patientData);
        console.log("patientData: ", patientData.length);
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery]
  );

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

      await Promise.all(
        Object.entries(data.uploadedFiles).map(async ([key, file]) => {
          if (file) {
            const fileUrl = await handleFileUpload(file, result.patientId, key);
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
    <div className="w-full relative">
      <div ref={ref} onFocus={() => setFocused(true)}>
        <SearchBox onSearch={handleSearch} />
        {patientData.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-30 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {patientData.map((patient) => (
              <div
                key={patient.id}
                onClick={onClickPatient(patient)}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
              >
                <span>{patient.fullName}</span>
              </div>
            ))}
          </div>
        )}
      </div>

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
            onValueChange={(value) => setActiveTab(value)}
            className="w-full bg-[#F8F9FA] rounded-lg shadow-md"
          >
            <center className="sm:pt-5">
              <TabsList className="flex justify-center flex-col sm:flex-row mb-4 border w-auto  gap-8 rounded:sm sm:rounded-full h-auto sm:h-[50px]">
                <TabsTrigger value="patient-info">1 - Patient Info</TabsTrigger>
                <TabsTrigger value="dental-formula">
                  2 - Dental formula
                </TabsTrigger>
                <TabsTrigger value="photos">3 - Photos</TabsTrigger>
                <TabsTrigger value="treatment-plan">
                  4 - Treatment Plan
                </TabsTrigger>
                <TabsTrigger value="submit-info">5 - Submit Info</TabsTrigger>
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

            <TabsContent value="submit-info">
              <PatientSubmitInfo />
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
}
