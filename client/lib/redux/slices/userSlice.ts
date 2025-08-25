// store/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "@/types/index";

const defaultUser: userType = {
  username: "default-user",
  email: "demoemaol@mail.com",
  password: "123",
  isOnline: false,
  lastSeen: new Date(),
};

interface UserState {
  allUsers: userType[];
  currentUser: userType;
}

const initialState: UserState = {
  allUsers: [],
  currentUser: defaultUser,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers(state, action: PayloadAction<userType[]>) {
      state.allUsers = action.payload;
    },
    addUser(state, action: PayloadAction<userType>) {
      state.allUsers.push(action.payload);
    },
    updateUser(state, action: PayloadAction<userType>) {
      const index = state.allUsers.findIndex(
        (u) => u.email === action.payload.email
      );
      if (index !== -1) state.allUsers[index] = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<userType>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setAllUsers, addUser, updateUser, setCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;
