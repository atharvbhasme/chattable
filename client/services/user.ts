import axiosInstance from "@/lib/axiosInstance"
import { userType } from "@/types"

export const getAllUsers = async ():Promise<userType[]> => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
    const token = sessionStorage.getItem('token');
    const response = await axiosInstance.get(url,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data as userType[];
}

export const getUserById = async (userId:string):Promise<userType> => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`
    const token = sessionStorage.getItem('token');
    const response = await axiosInstance.get(url,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data[0] as userType;
}