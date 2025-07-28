'use client';
import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from 'next/navigation';

export default function Home() {
   const router = useRouter();
  const onLogin = () => {
    console.log("redirecting")
    router.push('/home')
  }
  return (
    <div className="relative min-h-svh">
      {/* ModeToggle in top-right */}
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Centered Login Form */}
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm onLogin={onLogin}/>
        </div>
      </div>
    </div>
  );
}
