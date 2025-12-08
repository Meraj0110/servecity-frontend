"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSignup } from "@/hooks/useSignup";
import { useResendConfirmation } from "@/hooks/useResendConfirmationMail";

interface SignupFormProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const SignupForm = ({
  heading,
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "/login",
}: SignupFormProps) => {
  const signupMutation = useSignup();
  const resendMutation = useResendConfirmation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [countdown, setCountdown] = useState(100);

  // ✨ Added: tracks if signup was completed once
  const [signupDone, setSignupDone] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPwd) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signupMutation.mutateAsync({ email, password });

      alert("Signup successful! Check your email for verification.");

      // ✨ show resend link only after successful signup
      setSignupDone(true);

      setCountdown(100);
    } catch (err: any) {
      alert(err.message || "Signup failed");
    }
  };

  return (
    <section className="h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border px-6 py-12 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
            <div className="flex items-center gap-1 lg:justify-start">
              <a href={logo.url}>
                <span className="text-2xl font-bold">ServeCity</span>
              </a>
            </div>
            {heading && <h1 className="text-3xl font-semibold">{heading}</h1>}
          </div>

          <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? "Creating..." : signupText}
                </Button>

                <Button variant="outline" className="w-full" type="button">
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>
            </div>
          </form>

          {/* ✨ Resend confirmation shown ONLY AFTER signup */}
          {signupDone && (
            <button
              type="button"
              disabled={countdown > 0}
              onClick={() =>
                resendMutation.mutate(email, {
                  onSuccess: () => setCountdown(100),
                })
              }
              className="text-sm text-center mt-1 underline text-muted-foreground"
            >
              {countdown > 0
                ? `Resend confirmation in ${countdown}s`
                : "Resend Confirmation Email"}
            </button>
          )}

          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{loginText}</p>
            <a
              href={loginUrl}
              className="text-primary font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SignupForm };
