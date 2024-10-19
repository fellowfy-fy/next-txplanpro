import React from "react";
import { FormInput } from "./form-input";

interface Props {
  className?: string;
}

export const PatientInfoForm: React.FC<Props> = () => {
  return (
    <div>
      <FormInput name="fullName" label="Full Name" required />
      <FormInput name="birthDate" type="date" label="Birth Date" required />
      <FormInput name="address" label="Address" required />
    </div>
  );
};
