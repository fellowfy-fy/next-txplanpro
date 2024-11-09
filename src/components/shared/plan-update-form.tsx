"use client";
import { planSchema, TPlanFormValues } from '@/constants/plan-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plan, PlanImage, Tooth } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { NextPrevTab } from './next-prev-tab';
import { PlanForm } from './plan-form';
import toast from 'react-hot-toast';
import { handleFileUpload } from '@/hooks/handle-file-upload';
import { urlToFile } from '@/lib/url-to-file';
import { updatePlan } from '@/app/dashboard/edit-plan/[planId]/actions';
import { useActivePatient } from '@/store/active-patient';

interface Props {
  className?: string;
  plan?: Plan;
  doctorId: number;
  teeth: Tooth[] | undefined;
  images: PlanImage[] | undefined;
}


export const PlanUpdateForm: React.FC<Props> = ({ className, plan, doctorId, teeth, images }) => {
  const [activeTab, setActiveTab] = React.useState("dental-formula");
  const router = useRouter();
  const {patient} = useActivePatient()
  
  const tabs = [
    "dental-formula",
    "photos",
    "treatment-plan",
  ];


  const methods = useForm<TPlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: plan?.title,
      teeth: teeth?.map((tooth) => ({
        id: tooth.id,
        number: tooth.number,
        diagnosis: tooth.diagnosis,
        treatments: tooth.treatments,
        note: tooth.note
      })) ?? [],
      uploadedFiles: {
        upper_occlusal:  null,
        lower_occlusal:  null,
        side_left:  null,
        side_right:  null,
        panoramic_xray:  null,
      },
    },
  });

  
  React.useEffect(() => {
    const loadFiles = async () => {
      if (images?.length) {
        const uploadedFiles: TPlanFormValues['uploadedFiles'] = {
          upper_occlusal: null,
          lower_occlusal: null,
          side_left: null,
          side_right: null,
          panoramic_xray: null,
        };

        await Promise.all(
          images.map(async (image) => {
            try {
              if (image.imageUrl && image.name in uploadedFiles) {
                const file = await urlToFile(image.imageUrl, image.name, 'image/jpeg');
                uploadedFiles[image.name as keyof typeof uploadedFiles] = file;
              }
            } catch (error) {
              console.error(`Failed to load image ${image.name}:`, error);
            }
          })
        );

        methods.setValue('uploadedFiles', uploadedFiles);
      }
      methods.setValue('teeth', teeth?.map((tooth) => ({
        id: tooth.id,
        number: tooth.number,
        diagnosis: tooth.diagnosis,
        treatments: tooth.treatments,
        note: tooth.note
      })) ?? [],)
      methods.setValue('title', plan?.title ?? '');
    };

    loadFiles();
  }, [images, methods.setValue]);

  const handleSubmit = async (data: TPlanFormValues) => {
    try {
      const { title, teeth } = data
      const result = await updatePlan({title, teeth}, plan!.id);

      await Promise.all(
        Object.entries(data.uploadedFiles).map(async ([key, file]) => {
          if (file) {
            const fileUrl = await handleFileUpload({
              file,
              key,
              planId: result?.plan?.id,
              planImage: true
            });
            return { [key]: fileUrl };
          }
          return { [key]: null };
        })
      );

        toast.success(`Plan ${data.title} updated successfully!`, {
          position: 'bottom-right',
          duration: 3000,
        });
        router.push(`/dashboard/all-plans/${patient?.id}`);
      
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  return (
    <div className={className}>
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
    </div>
  );
};