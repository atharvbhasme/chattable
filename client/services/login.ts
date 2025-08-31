import axiosInstance from "@/lib/axiosInstance";
import { loginResponseInterface } from "@/types";

export const login = async (username:string, password:string):Promise<loginResponseInterface> => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`
    const res= await axiosInstance.post(url,{
        username: username,
        password: password
    })
    return res.data as loginResponseInterface;
}