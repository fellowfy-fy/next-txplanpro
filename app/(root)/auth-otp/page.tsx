import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import OTP from "@/components/shared/otp";

export default function AuthOTP() {
  return (
    <Container className="max-w-[500px] ">
      <center>
        <Title text="Welcome to TxPlan!" size="lg" className="font-semibold" />
        <Title
          text="Please, enter OTP code"
          size="sm"
          className="font-normal py-3"
        />
        <OTP />
        <Button variant="secondary">Resend code</Button>
      </center>
    </Container>
  );
}
