import axiosInstance from "@/lib/axiosInstance"
import { messageInterface } from "@/types"

export const getMessagesForUser = async (userId: string, receiverID:string): Promise<messageInterface[]> => {
    console.log('Getting message for ', userId, receiverID)
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMessagesForUser?senderId=${userId}&&receiverID=${receiverID}`
    const token = sessionStorage.getItem('token');
    const response = await axiosInstance.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    console.log(`Messages ${JSON.stringify(response.data.messages)}`)
    return response.data.messages as messageInterface[];
}

export const getMessagesForSingleUser = async (userId: string): Promise<messageInterface[]> => {
    console.log(`Getting message for ${userId}`)
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMessageForSingleUser?senderId=${userId}`
    const token = sessionStorage.getItem('token');
    const response = await axiosInstance.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    console.log("data for response", response.data.messages)
    return response.data.messages as messageInterface[];
}