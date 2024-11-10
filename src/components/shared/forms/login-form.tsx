import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  TFormLoginValues,
  formLoginSchema,
} from "../../../constants/register-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./form-input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = () => {
  const router = useRouter();
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!resp?.ok) {
        throw Error();
      }

      router.refresh();
    } catch (error) {
      console.error("Error [LOGIN]", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <p className="text-gray-400">Enter your email to login</p>
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
