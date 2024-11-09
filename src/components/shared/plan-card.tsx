"use client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Patient, Plan, UserRole } from "@prisma/client";
import { Button } from "../ui/button";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { Api } from "@/services/api-client";
import toast from 'react-hot-toast';
import { useSetPatient } from "@/hooks/use-set-patient";
import { useActivePatient } from "@/store/active-patient";
import React from "react";

interface PlanCardProps {
  plans: Plan[];
  // doctor: {
  //   id: string;
  //   role: UserRole;
  //   name: string;
  //   image: string;
  // } | null;
  className?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plans,
  // doctor,
}) => {
  const router = useRouter();
  // const handlePatientClick = useSetPatient();
  // const [loadingStates, setLoadingStates] = React.useState<Record<number, boolean>>({});
  // const  { patient: activePatient }  = useActivePatient()
 
  // const handleDelete = async (patientId: number, doctorId: number) => {
  //   setLoadingStates(prev => ({ ...prev, [patientId]: true }));
    
  //   try {
  //     const response = await Api.patients.deleteId(patientId, doctorId);
     
  //     if (response.message) {
  //       toast.success(response.message, {
  //         position: 'bottom-right',
  //         duration: 3000,
  //       });
  //       router.refresh();
  //     }
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.error || 'Failed to delete patient', {
  //       position: 'bottom-right',
  //       duration: 3000,
  //     });
  //   } finally {
  //     setLoadingStates(prev => ({ ...prev, [patientId]: false }));
  //   }
  // };

  return (
    <>
      {plans.map((plan) => (
        <Card key={plan.id}>
          <CardContent className="grid gap-4 mt-5">
            <div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold leading-none pb-2">
                    Plan: {plan.title}
                  </p>
                  {/* <Button
                    variant={patient.id === activePatient?.id ? 'success' : 'secondary'}
                    onClick={() => {handlePatientClick(patient)}}
                  >
                    {patient.id === activePatient?.id ? 'Active' : 'Select'}
                  </Button> */}
                </div>
                {/* {new Date(patient.birthDate).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} */}
                {/* <p className="text-sm text-muted-foreground">{}</p> */}
              </div>
            </div>
            <hr />
            <div className="flex flex-row justify-between items-center">
              {/* <p className="text-lg leading-none flex flex-row">
                by dr. {doctor?.name}
              </p> */}
            </div>
            <hr />
            <div className="flex flex-row justify-start gap-3 items-center">
              <Button
                variant="default"
                onClick={() => {router.push(`/dashboard/edit-plan/${plan.id}`)}}
              >
                Edit Plan
              </Button>
              {/* <Button
                variant="outline"
                onClick={() => {
                  router.push(`/dashboard/pdf/${patient.id}`);
                }}
              >
                <Pencil />
              </Button> */}
              {/* <Button
                variant="destructive"
                onClick={() => {handleDelete(patient.id, Number(doctor?.id))}}
                disabled={loadingStates[patient.id]}
              >
                {!loadingStates[patient.id] ? (
                  <Trash2 />
                ) : (
                  <Loader className="w-5 h-5 animate-spin" />
                )}
              </Button> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};