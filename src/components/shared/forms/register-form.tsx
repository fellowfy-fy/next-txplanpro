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
  onSwitchToRegister?: () => void;
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
      console.log("Ошибка регистрации" + error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" placeholder="Email" required className="w-[374px] h-[54px]" />
        <FormInput name="username" placeholder="Username" required className="w-[374px] h-[54px]" />
        <FormInput name="fullName" placeholder="Full name" required className="w-[374px] h-[54px]" />
        <FormInput name="password" placeholder="Password" type="password" required className="w-[374px] h-[54px]" />
        <FormInput
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          required
          className="w-[374px] h-[54px]"
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