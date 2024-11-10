"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TPatientFormValues, patientSchema } from "@/constants/patient-schema";
import { useSession } from 'next-auth/react';
import { createPatient } from '@/app/dashboard/create-plan/actions';
import { PatientInfoForm } from './forms/patient-info-form';
import toast from 'react-hot-toast';
import { join } from '@/lib/utils';

export const CreateNewPatientCard = () => {
  const { data: session } = useSession();
  const methods = useForm<TPatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: "",
      address: "",
      birthDate: new Date(),
    },
  });

  const { register, handleSubmit, formState: { errors } } = methods;
  const router = useRouter();

  const onSubmit = async (data: TPatientFormValues) => {
    try {
      const doctorId = Number(session?.user?.id);
      if (!doctorId) throw new Error("You are not signed in!");
      
      const result = await createPatient({
        fullName: data.fullName,
        birthDate: data.birthDate,
        address: data.address,
        doctorId,
      });
     
      if (result?.success) {
        toast.success(`Patient ${data.fullName} created successfully!`, {
          position: 'bottom-right',
          duration: 3000,
        });
        router.refresh();
      } else {
        throw new Error("Failed to create patient");
      }
    } catch (error) {
      toast.error(join("Error creating patient:", error), {
        position: 'bottom-right',
        duration: 3000,
      });
      console.error("Error creating patient:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Patient</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <PatientInfoForm />
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="default"
              >
                Add Patient
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};