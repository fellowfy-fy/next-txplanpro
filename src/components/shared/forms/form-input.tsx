"use client";
import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { ClearButton } from "./clear-button";
import { ErrorText } from "./error-text";
import { RequiredSymbol } from "./required-symbol";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  type?: string;
  isNumber?: boolean;
  placeholder?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  type,
  isNumber,
  placeholder,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [isFocused, setIsFocused] = useState(false);
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
          className="h-[54px] text-md bg-[#F1F1F1] rounded-[15px] text-center placeholder:text-center"
          {...register(name, {
            setValueAs: isNumber ? (value: string) => Number(value) : undefined,
          })}
          value={formatValue}
          type={type}
          placeholder={(isFocused || value) ? "" : placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};