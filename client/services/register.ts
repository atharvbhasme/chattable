import axiosInstance from "@/lib/axiosInstance";
import { singUpInterface } from "@/types";

export const register = async (username:string, email: string,  password:string):Promise<singUpInterface> => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`;
    const res = await axiosInstance.post(url,{
        username: username,
        password: password,
        email: email
    })
    return res.data;
}