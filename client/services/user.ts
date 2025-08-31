import axiosInstance from "@/lib/axiosInstance"
import { userType } from "@/types"

export const getAllUsers = async ():Promise<userType[]> => {
    console.log('getting all the data')
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllUsers`
    const token = sessionStorage.getItem('token');
    console.log('tokens', token)
    const response = await axiosInstance.get(url,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data as userType[];
}