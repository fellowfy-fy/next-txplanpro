"use client";
// import { useRouter } from "next/navigation";
import React from "react";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/components/shared/forms/register-form";
import { LoginForm } from "@/components/shared/forms/login-form";
import { useSearchParams } from "next/navigation";
import toast from 'react-hot-toast'

export default function AuthPage() {
  // const [open, setOpen] = useState(false);
  // const router = useRouter();

  // const handleCreateAccount = () => {
  //   setOpen(true);
  //   router.push("/auth-otp");
  // };

  const searchParams = useSearchParams()
  const toastShown = React.useRef(false)
  
  React.useEffect(() => {
    if (!toastShown.current && searchParams.get('auth') === 'required') {
      toast.error('Please login to access the system', {
        duration: 4000,
        position: 'top-center',
      })
      toastShown.current = true
    }
  }, [searchParams])



  return (
    <Container className="w-auto sm:max-w-[800px]">
      <center>
        <Title text="Welcome to TxPlan!" size="lg" className="font-semibold" />
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Login</TabsTrigger>
            <TabsTrigger value="password">Registration</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <LoginForm />
          </TabsContent>
          <TabsContent value="password">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </center>
    </Container>
  );
}
