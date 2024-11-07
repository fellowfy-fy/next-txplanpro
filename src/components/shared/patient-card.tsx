"use client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Patient, UserRole } from "@prisma/client";
import { Button } from "../ui/button";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { Api } from "@/services/api-client";
import toast from 'react-hot-toast';
import React from "react";

interface PatientCardProps {
  patients: Patient[];
  doctor: {
    id: string;
    role: UserRole;
    name: string;
    image: string;
  } | null;
  className?: string;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patients,
  doctor,
}) => {
  const router = useRouter();
  // Создаем объект для хранения состояния загрузки для каждой карточки
  const [loadingStates, setLoadingStates] = React.useState<Record<number, boolean>>({});
 
  const handleDelete = async (patientId: number, doctorId: number) => {
    // Устанавливаем loading только для конкретной карточки
    setLoadingStates(prev => ({ ...prev, [patientId]: true }));
    
    try {
      const response = await Api.patients.deleteId(patientId, doctorId);
     
      if (response.message) {
        toast.success(response.message, {
          position: 'bottom-right',
          duration: 3000,
        });
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete patient', {
        position: 'bottom-right',
        duration: 3000,
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [patientId]: false }));
    }
  };

  return (
    <>
      {patients.map((patient) => (
        <Card key={patient.id}>
          <CardContent className="grid gap-4 mt-5" key={patient.id}>
            <div>
              <span className="flex translate-y-1" />
              <div className="space-y-1">
                <p className="text-xl font-bold leading-none pb-2">
                  Patient: {patient.fullName}
                </p>
                {new Date(patient.birthDate).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                <p className="text-sm text-muted-foreground">{patient.address}</p>
              </div>
            </div>
            <hr />
            <div className="flex flex-row justify-between items-center">
              <p className="text-lg leading-none flex flex-row">
                by dr. {doctor?.name}
              </p>
            </div>
            <hr />
            <div className="flex flex-row justify-start gap-3 items-center">
              <Button
                variant="default"
                onClick={() => {
                  router.push(`/dashboard/pdf/${patient.id}`);
                }}
              >
                Create Plan
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  router.push(`/dashboard/pdf/${patient.id}`);
                }}
              >
                Update Plan
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  router.push(`/dashboard/pdf/${patient.id}`);
                }}
              >
                <Pencil />
              </Button>
              <Button
                variant="destructive"
                onClick={() => {handleDelete(patient.id, Number(doctor?.id))}}
                disabled={loadingStates[patient.id]}
              >
                {!loadingStates[patient.id] ? (
                  <Trash2 />
                ) : (
                  <Loader className="w-5 h-5 animate-spin" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};