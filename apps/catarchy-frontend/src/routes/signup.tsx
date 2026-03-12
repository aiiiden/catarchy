import {
  useSendVerificationEmail,
  useSignUp,
  useVerifyEmailCode,
} from "@/features/auth";
import { Button, Scaffold, TextInput } from "@/features/common";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});

type Step = "email" | "verify" | "register";

function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  return (
    <Scaffold avoidKeyboard>
      <Scaffold.Body className="p-4">
        <header>
          <h1>Sign Up</h1>
        </header>
        {step === "email" && (
          <EmailStep
            email={email}
            onEmailChange={setEmail}
            onNext={() => setStep("verify")}
          />
        )}
        {step === "verify" && (
          <VerifyStep email={email} onNext={() => setStep("register")} />
        )}
        {step === "register" && (
          <RegisterStep
            email={email}
            onComplete={() => navigate({ to: "/login" })}
          />
        )}
      </Scaffold.Body>
    </Scaffold>
  );
}

function EmailStep({
  email,
  onEmailChange,
  onNext,
}: {
  email: string;
  onEmailChange: (v: string) => void;
  onNext: () => void;
}) {
  const sendVerification = useSendVerificationEmail();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendVerification.mutate({ email }, { onSuccess: onNext });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Email"
        type="text"
        required
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      {sendVerification.error && <p>{String(sendVerification.error)}</p>}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={sendVerification.isPending}
      >
        {sendVerification.isPending ? "Sending..." : "Send Verification Code"}
      </Button>
    </form>
  );
}

function VerifyStep({ email, onNext }: { email: string; onNext: () => void }) {
  const [code, setCode] = useState("");
  const verifyCode = useVerifyEmailCode();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyCode.mutate({ email, code }, { onSuccess: onNext });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Verification code sent to {email}</p>
      <TextInput
        label="Verification Code"
        type="text"
        required
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {verifyCode.error && <p>{String(verifyCode.error)}</p>}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={verifyCode.isPending}
      >
        {verifyCode.isPending ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
}

function RegisterStep({
  email,
  onComplete,
}: {
  email: string;
  onComplete: () => void;
}) {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const signUp = useSignUp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp.mutate({ email, handle, password }, { onSuccess: onComplete });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Handle"
        type="text"
        required
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <TextInput
        label="Password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {signUp.error && <p>{String(signUp.error)}</p>}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={signUp.isPending}
      >
        {signUp.isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
