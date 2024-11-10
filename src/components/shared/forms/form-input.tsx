"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { ClearButton } from "./clear-button";
import { ErrorText } from "./error-text";
import { RequiredSymbol } from "./required-symbol";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  type?: string;
  isNumber?: boolean;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  type,
  isNumber,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const formatValue = React.useMemo(() => {
    if (type === 'date' && value) {
      const date = new Date(value);
      return date.toISOString().split('T')[0];
    }
    return value;
  }, [type, value]);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input
          className="h-12 text-md"
          {...register(name, {
            setValueAs: isNumber ? (value: string) => Number(value) : undefined,
          })}
          value={formatValue}
          type={type}
          {...props}
        />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
