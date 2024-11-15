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
import { upsertContent, upsertServices } from "@/app/dashboard/settings/actions";
import { handleFileUpload } from "@/hooks/handle-file-upload";
import { convertUrlsToFiles } from "../convert-urls-to-file";
import ElementGrid from "../element-grid";

interface Props {
  className?: string;
  initData?: SettingsDTO | null;
}

export interface Service {
  name: string;
  price: number;
}

export interface Content {
  name: string;
  content: string;
}

const formatServiceName = (type: string) => {
  if (!type) return "";
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
        { name: "extracted", price: 200 },
        { name: "tooth_crown", price: 100 },
        { name: "implant_crown", price: 100 },
        { name: "implant", price: 100 },
        { name: "root_recession", price: 100 },
        { name: "altered_passive_eruption", price: 100 },
        { name: "filling", price: 100 },
      ],
      uploadedFiles: {
        intro: null,
        vision: null,
        break: null,
      },
      content: [
        { name: "intro", content: "" },
        { name: "vision", content: "" },
        { name: "break", content: "" },
        { name: "services", content: "" },
      ],
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
                { name: "extracted", price: 200 },
                { name: "tooth_crown", price: 100 },
                { name: "implant_crown", price: 100 },
                { name: "implant", price: 100 },
                { name: "root_recession", price: 100 },
                { name: "altered_passive_eruption", price: 100 },
                { name: "filling", price: 100 },
              ]
        );

        methods.setValue(
          "content",
          initData.content && initData.content.length
            ? initData.content
            : [
                { name: "intro", content: "" },
                { name: "vision", content: "" },
                { name: "break", content: "" },
                { name: "services", content: "" },
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
      const contents = data.content;

      await upsertServices({ services, doctorId });
      await upsertContent({ contents, doctorId });

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
      const result = { success: true };
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
        <ElementGrid>
        {methods.watch("servicePrices").map((service, index) => (
          <div key={index}>
            <FormInput
              name={`servicePrices.${index}.price`}
              label={formatServiceName(service.name)}
              type="number"
              isNumber={true}
            />
          </div>
        ))}
        </ElementGrid>
        <Title text="Content for PDF" />
        <ElementGrid> 
        {methods.watch("content").map((content, index) => (
          <div key={index}>
            <FormInput
              name={`content.${index}.content`}
              label={formatServiceName(content.name)}
            />
          </div>
        ))}
        </ElementGrid>
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
