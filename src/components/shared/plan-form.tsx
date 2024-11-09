import React from 'react';
import DentalFormula from "./dental-formula";
import Photos from "./create-photos";
import TreatmentPlan from "./treatment-plan";
import { Button } from "../ui/button";
import { FormInput } from "./forms/form-input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFormContext } from 'react-hook-form';
import { TPlanFormValues } from '@/constants/plan-schema';
import { ToothData } from './create-plan-form';


interface Props {
  className?: string;
  activeTab: string;
  setActiveTab: (tab:string) => void;
}

export const PlanForm: React.FC<Props> = ({ className, activeTab, setActiveTab }) => {
  const { setValue, watch } = useFormContext();
  return (
    <div className={className}>
          <FormInput name="title" placeholder="TItle"/>
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
                  setValue("teeth", updatedData);
                }}
                teethData={watch("teeth")}
              />
            </TabsContent>

            <TabsContent value="photos">
            <Photos<TPlanFormValues['uploadedFiles']>
              uploadedFiles={watch("uploadedFiles")}
              onFileUpload={(variant, file) => {
                setValue(`uploadedFiles.${variant}`, file);
              }}
              hasLastDragDrop={true}
            />
            </TabsContent>

            <TabsContent value="treatment-plan">
              <TreatmentPlan
                handleTeethDataChange={(updatedData: ToothData[]) => {
                  setValue("teeth", updatedData);
                }}
                teethData={watch("teeth")}
              />
            </TabsContent>
          </Tabs>
          <div className="flex justify-center">
           <Button type="submit" variant="default" className="py-4 px-20 m-3" >Submit</Button>
          </div>
    </div>
  );
};