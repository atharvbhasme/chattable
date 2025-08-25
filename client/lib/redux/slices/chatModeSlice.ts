// store/slices/chatModeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMode } from "@/types/index";

interface ChatModeState {
  mode: ChatMode;
}

const initialState: ChatModeState = {
  mode: "normal",
};

const chatModeSlice = createSlice({
  name: "chatMode",
  initialState,
  reducers: {
    setChatMode(state, action: PayloadAction<ChatMode>) {
      state.mode = action.payload;
    },
  },
});

export const { setChatMode } = chatModeSlice.actions;
export default chatModeSlice.reducer;
