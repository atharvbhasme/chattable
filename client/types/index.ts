export interface loginResponseInterface{
    token: string | null,
    userId: string | null,
    message?: string
}

export interface userType {
    id: string,
    username: string
    email: string
    password: string
    createdAt: string,
    updatedAt: string,
    isOnline?: boolean,
}

export interface messageInterface {
    id: string,
    sender: string,
    reciever: string,
    content: string,
    read: boolean,
    createdAt: string,
    updatedAt: string
}


export type ChatMode = "normal" | "ai";