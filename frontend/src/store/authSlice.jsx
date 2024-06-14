import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authState",
  initialState: {
    isLoggedIn: false,
    role: "user",
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },

    logout(state) {
      state.isLoggedIn = false;
    },

    changeRole(state, action) {
      const { role } = action.payload;
      state.role = role;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, changeRole } = authSlice.actions;

export default authSlice.reducer;
