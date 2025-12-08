"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLogin } from "@/hooks/useLogin";

interface LoginFormProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const LoginForm = ({
  heading,
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "ServeCity",
  },
  buttonText = "Login",
  googleText = "Sign up with Google",
  signupText = "Don't have an account?",
  signupUrl = "/signup",
}: LoginFormProps) => {
  // -------------------------
  // 🧠 OLD LOGIN LOGIC HERE
  // -------------------------
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync({ email, password });
      alert("Login successful!");
      window.location.href = "/"; // optional redirect
    } catch (err: any) {
      alert(err?.message || "Login failed");
    }
  };

  return (
    <section className=" h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border px-6 py-12 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1 lg:justify-start">
              <a href={logo.url}>
                <span className="font-bold text-2xl">{logo.title}</span>
              </a>
            </div>
            {heading && <h1 className="text-3xl font-semibold">{heading}</h1>}
          </div>

          {/* 🔥 Form logic injected but UI unchanged */}
          <form className="flex w-full flex-col gap-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : buttonText}
                </Button>

                <Button variant="outline" className="w-full" type="button">
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>
            </div>
          </form>

          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { LoginForm };
