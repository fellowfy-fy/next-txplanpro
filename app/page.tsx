"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input, InputProps } from "@/components/ui/input";
import ElementGrid from "@/components/shared/element-grid";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Initialize the useRouter hook

  // Handler for when the user clicks "Create account"
  const handleCreateAccount = () => {
    setOpen(true);
    router.push("/auth-otp"); // Redirect to /auth-otp
  };

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
            <p className="pb-5">Enter your login and password here</p>
            <ElementGrid>
              <div className="flex flex-col items-start">
                <p className="pb-2">Username</p>
                <Input placeholder="johndoe24" className="h-[50px]" />
              </div>
              <div className="flex flex-col items-start">
                <p className="pb-2">Password</p>
                <Input placeholder="Password" className="h-[50px]" />
              </div>
            </ElementGrid>
            <div className="pt-5">
              <Button
                variant="secondary"
                className="w-full h-[50px]"
                onClick={() => setOpen(true)}
              >
                Login
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <p className="pb-5">Create your account here</p>
            <ElementGrid>
              <div className="flex flex-col items-start">
                <p className="pb-2">Full Name</p>
                <Input placeholder="John Doe" className="h-[50px]" />
              </div>
              <div className="flex flex-col items-start">
                <p className="pb-2">Email</p>
                <Input placeholder="johndoe@example.com" className="h-[50px]" />
              </div>
              <div className="flex flex-col items-start">
                <p className="pb-2">Username</p>
                <Input placeholder="johndoe24" className="h-[50px]" />
              </div>
              <div className="flex flex-col items-start">
                <p className="pb-2">Password</p>
                <Input placeholder="Password" className="h-[50px]" />
              </div>
              <div className="flex flex-col items-start">
                <p className="pb-2">Repeat password</p>
                <Input placeholder="Repeat password" className="h-[50px]" />
              </div>
            </ElementGrid>
            <div className="pt-5">
              <Button
                variant="secondary"
                className="w-full h-[50px]"
                onClick={handleCreateAccount} // Call the handler for creating an account
              >
                Create account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </center>
    </Container>
  );
}
