import axiosInstance from "@/lib/axiosInstance";
import { loginResponse } from "@/types/user";

export const login = async (username:string, password:string):Promise<loginResponse> => {
    const res:loginResponse = await axiosInstance.post('/',{
        username: username,
        password: password
    })
    return res
}