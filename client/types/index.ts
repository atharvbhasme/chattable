export interface loginResponseInterface {
    token: string | null,
    userId: string,
    username?: string,
    email?: string
}

export interface singUpInterface {
    message: string
}

export interface currentLoginedUser {
    userId?: string;
    username?: string;
    email?: string;
}

export interface userType {
    id: string,
    username: string
    email: string
    password: string
    createdAt: string,
    updatedAt: string,
    isOnline?: boolean,
    requests?: { from: string, status: string }[],
    friends?: string[]
}

export interface messageInterface {
    id: string,
    sender: string,
    receiver: string,
    content: string,
    read: boolean,
    createdAt: string,
    updatedAt: string
}


export type ChatMode = "normal" | "ai";