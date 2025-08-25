import axiosInstance from "@/lib/axiosInstance";
import { loginResponseInterface } from "@/types";

export const register = async (username:string, email: string,  password:string):Promise<loginResponseInterface> => {
    console.log("env --->", process.env.NEXT_PUBLIC_BASE_URL)
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`;
    const res:loginResponseInterface = await axiosInstance.post(url,{
        username: username,
        password: password,
        email: email
    })
    return res
}