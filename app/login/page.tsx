import { LoginForm } from "@/components/ui/loginForm";
import { BackgroundImageTexture } from "@/components/ui/bg-image-texture";

export default function LoginPage() {
  return (
    // <BackgroundImageTexture variant="inflicted" opacity={0.9}>
    <div className="bg-[url('/bg/drops.jpeg')] bg-cover bg-center bg-no-repeat">
      <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </div>
    // </BackgroundImageTexture>
  );
}
