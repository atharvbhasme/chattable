// store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginResponseInterface } from "@/types"

const defaultLoginResponse: loginResponseInterface = {
  token: "",
  userId: "admin",
};

interface AuthState {
  loginResponse: loginResponseInterface;
}

const initialState: AuthState = {
  loginResponse: defaultLoginResponse,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginResponse(state, action: PayloadAction<loginResponseInterface>) {
      state.loginResponse = action.payload;
    },
    clearLoginResponse(state) {
      state.loginResponse = defaultLoginResponse;
    },
  },
});

export const { setLoginResponse, clearLoginResponse } = authSlice.actions;
export default authSlice.reducer;
