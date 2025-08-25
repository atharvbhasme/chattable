export interface loginResponseInterface{
    token: string | null,
    userId: string | null,
    message?: string
}

export interface userType {
    username: string
    email: string
    password: string
    isOnline: boolean
    lastSeen: Date
}


export type ChatMode = "normal" | "ai";