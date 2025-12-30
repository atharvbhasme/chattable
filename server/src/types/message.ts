export interface messageInput {
    sender: string,
    receiver?: string,
    roomId?: string,
    content: string,
    read?: string
}

export interface GetMessagesQuery {
  senderId: string;
  receiverID: string
}

export interface GetMessagesForSingelUserQuery {
  senderId: string
}