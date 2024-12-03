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
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<Props> = ({ onSwitchToRegister }) => {
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
        <FormInput 
          name="username" 
          placeholder="Username" 
          required 
          className="w-[374px] h-[54px]"
        />
        <FormInput 
          name="password" 
          placeholder="Password" 
          type="password" 
          required 
          className="w-[374px] h-[54px]"
        />
        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Login
        </Button>
        <div className="flex flex-col text-center">
          <p>If you don't have an account</p>
          <p 
            onClick={onSwitchToRegister}
            className="underline text-black cursor-pointer hover:text-black/70 transition-colors"
          >
            follow these steps to join.
          </p>
        </div>
      </form>
    </FormProvider>
  );
};