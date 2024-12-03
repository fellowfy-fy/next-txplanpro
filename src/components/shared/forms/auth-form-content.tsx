"use client";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { RegisterForm } from "@/components/shared/forms/register-form";
import { LoginForm } from "@/components/shared/forms/login-form";
import { useSearchParams } from "next/navigation";
import toast from 'react-hot-toast';

export const AuthFormContent = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const searchParams = useSearchParams();
  const toastShown = React.useRef(false);

  React.useEffect(() => {
    if (!toastShown.current && searchParams.get('auth') === 'required') {
      toast.error('Please login to access the system', {
        duration: 4000,
        position: 'top-center',
      });
      toastShown.current = true;
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Container className="!w-[900px] !h-[552px] grid grid-cols-2">
        {/* Background Image Half */}
        <div
          className="bg-[url('/authbgimage.png')] bg-cover bg-center rounded-l-[50px]"
        />
        {/* Form Half */}
        <div className="bg-[#DEDFE6] rounded-r-[50px] p-8 flex flex-col items-center justify-center">
          <Title
            text="Welcome to TxPlan!"
            size="lg"
            className="text-center font-semibold mb-6"
          />
          {/* Dynamic Form Rendering */}
          {isLoginForm ? (
            <LoginForm onSwitchToRegister={() => setIsLoginForm(false)} />
          ) : (
            <RegisterForm onSwitchToRegister={() => setIsLoginForm(true)} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default AuthFormContent;