"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { TPatientFormValues } from "@/constants/patient-schema";
import { Button } from "../ui/button";

export const PatientSubmitInfo: React.FC = () => {
  // Получаем методы useForm из FormProvider
  const { watch } = useFormContext<TPatientFormValues>();

  // Получаем данные пациента из формы
  const fullName = watch("fullName");
  const address = watch("address");
  const birthDate = watch("birthDate");

  return (
    <div className="p-6">
      <h2 className="text-center text-lg font-bold mb-4">
        Patient Information (Read Only)
      </h2>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={fullName}
            readOnly
          />
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={birthDate}
            readOnly
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={address}
            readOnly
          />
        </div>

        {/* Кнопка сохранения */}
        <div className="flex justify-center gap-4 mt-6">
          {/* Кнопка для сабмита */}
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
