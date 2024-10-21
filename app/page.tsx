"use client";
// import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/components/shared/forms/register-form";
import { LoginForm } from "@/components/shared/forms/login-form";

export default function AuthPage() {
  // const [open, setOpen] = useState(false);
  // const router = useRouter();

  // const handleCreateAccount = () => {
  //   setOpen(true);
  //   router.push("/auth-otp");
  // };

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
