import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TPatientFormValues, patientSchema } from "@/constants/patient-schema";
import { createPatient } from "@/app/(root)/create/actions";
import React from "react";
import { FormInput } from "./form-input";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export const PatientInfoForm: React.FC<Props> = ({ className }) => {
  const form = useForm<TPatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: "",
      address: "",
      birthDate: "",
    },
  });

  const onSubmit = async (data: TPatientFormValues) => {
    try {
      const patientData = {
        fullName: data.fullName,
        address: data.address,
        birthDate: data.birthDate,
      };
      const userData = { email: "test@test.test" };
      await createPatient(patientData, userData);
      alert("Patient created successfully");
    } catch (error) {
      return console.log("[ERROR: PATIENT]" + error);
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="fullName" label="Full Name" required />
        <FormInput name="birthDate" type="date" label="Birth Date" required />
        <FormInput name="address" label="Address" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Create Patient
        </Button>
      </form>
    </FormProvider>
  );
};
