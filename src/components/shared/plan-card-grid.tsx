"use client"
import { Plan } from '@prisma/client';
import React from 'react';
import ElementGrid from './element-grid';
import { PlanCard } from './plan-card';
import { useRouter } from 'next/navigation';
import { useActivePatient } from '@/store/active-patient';

interface Props {
  className?: string;
  error?: string;
  plans?: Plan[]
}

export const PlanCardGrid: React.FC<Props> = ({ className, error, plans }) => {
  const router = useRouter()
  const { patient } = useActivePatient()

  React.useEffect(() => {
    if (patient)  {
        router.push(`/dashboard/all-plans/${patient.id}`)
    }
  }, [patient, router])

  return (
    <div className={className}>
      {error && <div className="text-red-500">{error}</div>}
      {plans && 
        <ElementGrid>
          {plans?.length > 0 ? (
            <PlanCard plans={plans} />
          ) : (
            <div className="text-gray-500">No plans found</div>
          )}
          </ElementGrid>
      }
    </div>
  );
};