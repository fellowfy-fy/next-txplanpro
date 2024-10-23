"use client";

import {
  businessSchema,
  TBusinessFormValues,
} from "@/constants/business-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Photos from "../create-photos";
import { FormInput } from "./form-input";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { upsertServices } from "@/app/(root)/settings/actions";
import { handleFileUpload } from "@/hooks/handle-file-upload";
import { convertUrlsToFiles } from "../convert-urls-to-file";

interface Props {
  className?: string;
  initData?: SettingsDTO | null;
}

export interface Service {
  type: string;
  price: number;
}

const formatServiceName = (type: string) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const BusinessForm: React.FC<Props> = ({ className, initData }) => {
  const { data: session } = useSession();
  const methods = useForm<TBusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      servicePrices: [
        { type: "extracted", price: 200 },
        { type: "tooth_crown", price: 100 },
        { type: "implant_crown", price: 100 },
        { type: "implant", price: 100 },
        { type: "root_recession", price: 100 },
        { type: "altered_passive_eruption", price: 100 },
        { type: "filling", price: 100 },
      ],
      uploadedFiles: {
        intro: null,
        vision: null,
        break: null,
      },
    },
  });

  React.useEffect(() => {
    const initialize = async () => {
      if (initData) {
        methods.setValue(
          "servicePrices",
          initData.prices && initData.prices.length
            ? initData.prices
            : [
                { type: "extracted", price: 200 },
                { type: "tooth_crown", price: 100 },
                { type: "implant_crown", price: 100 },
                { type: "implant", price: 100 },
                { type: "root_recession", price: 100 },
                { type: "altered_passive_eruption", price: 100 },
                { type: "filling", price: 100 },
              ]
        );

        if (initData.images && initData.images.length) {
          const settingsImages = initData.images;

          const fieldMap: Record<
            string,
            keyof TBusinessFormValues["uploadedFiles"]
          > = {
            intro: "intro",
            vision: "vision",
            break: "break",
          };

          const uploadedFiles = await convertUrlsToFiles<
            TBusinessFormValues["uploadedFiles"]
          >(settingsImages, fieldMap);

          methods.setValue("uploadedFiles", {
            intro: uploadedFiles.intro || null,
            vision: uploadedFiles.vision || null,
            break: uploadedFiles.break || null,
          });
        } else {
          methods.setValue("uploadedFiles", {
            intro: null,
            vision: null,
            break: null,
          });
        }
      }
    };
    initialize();
  }, [initData]);

  const handleSubmit = async (data: TBusinessFormValues) => {
    try {
      const doctorId = Number(session?.user?.id);
      if (!doctorId) throw new Error("Doctor not found");
      const services = data.servicePrices;

      const result = await upsertServices({ services, doctorId });

      await Promise.all(
        Object.entries(data.uploadedFiles).map(async ([key, file]) => {
          if (file) {
            const fileUrl = await handleFileUpload({
              file,
              doctorId,
              key,
              businessImage: true,
            });
            return { [key]: fileUrl };
          }
          return { [key]: null };
        })
      );

      if (result?.success) {
        alert("Settings were updated!");
      } else {
        throw new Error("Failed to create patient");
      }
    } catch (err) {
      console.error("Error updating services:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="p-4">
        <div className={className}>
          <Photos
            uploadedFiles={methods.watch("uploadedFiles")}
            onFileUpload={(
              variant: keyof TBusinessFormValues["uploadedFiles"],
              file: File | null
            ) => {
              methods.setValue(`uploadedFiles.${variant}`, file);
            }}
          />
        </div>
        <Title text="Prices of Services" />
        {methods.watch("servicePrices").map((service, index) => (
          <div key={index}>
            <FormInput
              name={`servicePrices.${index}.price`}
              label={formatServiceName(service.type)}
              type="number"
              isNumber={true}
            />
          </div>
        ))}
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};
