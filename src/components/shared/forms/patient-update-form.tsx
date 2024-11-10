"use client";
import { updatePatient } from '@/app/dashboard/patients/edit/[patientId]/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { patientSchema, TPatientFormValues } from '@/constants/patient-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Patient } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PatientInfoForm } from './patient-info-form';
import { Button } from '@/components/ui/button';
import { Title } from '@/components/ui/title';

interface Props {
  patient: Patient;
  className?: string;
}

export const PatientUpdateForm: React.FC<Props> = ({ patient, className }) => {
  const router = useRouter();

  const methods = useForm<TPatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: patient.fullName,
      birthDate: patient.birthDate,
      address: patient.address,
    },
  });

  React.useEffect(() => {
    const loadData = async () => {
      methods.setValue('fullName', patient?.fullName ?? '');
      methods.setValue('birthDate', patient?.birthDate ?? '');
      methods.setValue('address', patient?.address ?? '');
    };
    loadData();
  }, [methods.setValue]);

  const handleSubmit = async (data: TPatientFormValues) => {
    try {
      await updatePatient(data, patient.id);
      toast.success(`Patient ${data.fullName} updated successfully!`, {
          position: 'bottom-right',
          duration: 3000,
        });
        router.push(`/dashboard/patients/`);
      
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };
  
  return (
    <div className={className}>
      <Title text={`Update Patient ${patient.fullName}`} className='font-bold' />
      <Card>
      <CardContent className='mt-4'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="grid gap-4">
            <PatientInfoForm />
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="default"
              >
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
    </div>
  );
};