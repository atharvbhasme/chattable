"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { register } from "@/services/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SingUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [usernameInput, setUsenrame] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const showGoogleSingInOptions = false;
  const onSubmitRegister = async () => {
    const input = {
      username: usernameInput.trim(),
      email: emailInput.trim(),
      password: passwordInput.trim(),
    };

    const registerResult = await register(
      input.username,
      input.email,
      input.password
    );
    if (registerResult.message) {
      toast("Signup Successful", {
        duration: 2,
      });
      router.push("/");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create new account</CardTitle>
          <CardDescription>
            Enter your email and password below to create to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="text">Anonymous Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="alberteinstein123"
                onChange={(e) => setUsenrame(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full" onClick={onSubmitRegister}>
                Signup
              </Button>
              {showGoogleSingInOptions && (
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
