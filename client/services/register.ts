import axiosInstance from "@/lib/axiosInstance";
import { loginResponse } from "@/types/user";

export const register = async (username:string, email: string,  password:string):Promise<loginResponse> => {
    console.log("env --->", process.env.NEXT_PUBLIC_BASE_URL)
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`;
    const res:loginResponse = await axiosInstance.post(url,{
        username: username,
        password: password,
        email: email
    })
    return res
}