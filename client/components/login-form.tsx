'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { login } from "@/services/login";
import { toast } from "sonner"
import { useDispatch } from "react-redux";
import { setLoginResponse } from "@/lib/redux/slices/authSlice";


export function LoginForm({
  className,
  ...props
}:  React.ComponentProps<"div"> ) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userName, setUser] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async () => {
    const response = await login(userName, password);
    if(response.token){
      sessionStorage.setItem('token', response.token)
      toast("Login successful",{
        duration: 2
      })
    }
    dispatch(setLoginResponse({ token: response.token, userId: response.userId }))
    router.push('/landing')
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="lional ronaldo"
                  required
                  onChange={(e)=>setUser(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" onClick={handleLogin} disabled={userName === '' || password === '' }>
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
