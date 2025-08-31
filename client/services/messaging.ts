import axiosInstance from "@/lib/axiosInstance"
import { messageInterface } from "@/types"

export const getMessagesForUser = async (userId:string):Promise<messageInterface[]> => {
    console.log(`Getting message for ${userId}`)
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMessagesForUser?userId=${userId}`
    const token = sessionStorage.getItem('token');
    const response = await axiosInstance.get(url,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
    return response.data.messages as messageInterface[];
}