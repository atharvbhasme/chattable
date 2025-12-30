# This is app is built Engage in conversations and video calls with people from all over the world without revealing your identity. It's a great way to meet new friends and share stories in a safe, private space.

### Technology Used

**Frontend**
Nextjs
React

**Backend**
Fastify
MongoDB
socket.io

### App Stucture

Frontend: [client](client/)
Backend: [server](server/)
Socket: [socket](server/src/socket/socket.ts)

#####

MongoDB Database Schema
This document describes the **Message** and **User** data models used in the chat application. It is intended to provide clear structural context for AI systems, tooling, and developers.

---

##### Message Schema

Represents a single chat message, either in a one-to-one conversation or within a room.

##### Collection: `messages`

##### Fields

| Field       | Type              | Required | Description                                                  |
| ----------- | ----------------- | -------- | ------------------------------------------------------------ |
| `sender`    | `ObjectId (User)` | Yes      | Reference to the user who sent the message                   |
| `receiver`  | `ObjectId (User)` | No       | Reference to the receiving user (used in 1-to-1 chats)       |
| `roomId`    | `ObjectId (Room)` | No       | Reference to the room (used in group chats)                  |
| `content`   | `string`          | Yes      | Message body text                                            |
| `read`      | `boolean`         | No       | Whether the receiver has read the message (default: `false`) |
| `createdAt` | `Date`            | Auto     | Timestamp when the message was created                       |
| `updatedAt` | `Date`            | Auto     | Timestamp when the message was last updated                  |

---

##### User Schema

Represents an application user and their social/chat relationships.

##### Collection: `users`

##### Fields

| Field       | Type                | Required | Description                                             |
| ----------- | ------------------- | -------- | ------------------------------------------------------- |
| `username`  | `string`            | Yes      | Unique display name                                     |
| `email`     | `string`            | Yes      | Unique email address                                    |
| `password`  | `string`            | No       | Hashed password (optional for OAuth users)              |
| `isOnline`  | `boolean`           | No       | Whether the user is currently online (default: `false`) |
| `lastSeen`  | `Date`              | No       | Last activity timestamp                                 |
| `friends`   | `ObjectId[] (User)` | No       | List of accepted friends                                |
| `requests`  | `FriendRequest[]`   | No       | Incoming friend requests                                |
| `createdAt` | `Date`              | Auto     | Account creation time                                   |
| `updatedAt` | `Date`              | Auto     | Last profile update time                                |

---

##### Fields

| Field    | Type              | Required | Description                                                              |
| -------- | ----------------- | -------- | ------------------------------------------------------------------------ |
| `from`   | `ObjectId (User)` | Yes      | User who sent the friend request                                         |
| `status` | `string`          | No       | Request state: `pending`, `accepted`, or `rejected` (default: `pending`) |
