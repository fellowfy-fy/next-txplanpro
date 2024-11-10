"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions";
import {
  formRegisterSchema,
  TFormRegisterValues,
} from "@/constants/register-schemas";
import { FormInput } from "./form-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = () => {
  const router = useRouter();
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      
      if (!resp?.ok) {
        throw Error();
      }

      router.refresh();
    } catch (error) {
      return console.log("Ошибка регистрации" + error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Full Name" required />
        <FormInput name="password" label="Password" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
