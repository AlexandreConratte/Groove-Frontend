import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username:'' , token : '', password : "" },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token =  action.payload.token;
      state.value.username = action.payload.username;
      state.value.password = action.payload.password;
    },
    logout: (state) => {
      

    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;