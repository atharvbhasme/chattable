'use client';

import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
   
  return (
    <div className="relative min-h-svh">
      {/* ModeToggle in top-right */}
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Centered Login Form */}
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
