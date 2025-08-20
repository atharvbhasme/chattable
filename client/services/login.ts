import axiosInstance from "@/lib/axiosInstance";
import { loginResponse } from "@/types/user";

export const login = async (username:string, password:string):Promise<loginResponse> => {
    const url = process.env.BASE_URL + '/login'
    const res:loginResponse = await axiosInstance.post(url,{
        username: username,
        password: password
    })
    return res
}