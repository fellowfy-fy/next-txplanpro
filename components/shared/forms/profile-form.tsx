"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  TFormRegisterValues,
  formRegisterSchema,
} from "../../../constants/register-schemas";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { FormInput } from "./form-input";
import { Button } from "@/components/ui/button";
import { updateUserInfo } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      revalidatePath("/profile");
    } catch (error) {
      return console.log("UPDATE error: " + error);
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
    redirect("/");
  };

  return (
    <Container>
      <Title text={`${data.fullName}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full Name" required />

          <FormInput
            type="password"
            name="password"
            label="New Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Repeat New Password"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Logout
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
