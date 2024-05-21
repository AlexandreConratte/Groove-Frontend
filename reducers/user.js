import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username:'' , token : '', },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token =  action.payload.token;
      state.value.username = action.payload.username;
    },
    logout: (state) => { 
      state.value = { username: '', token: '', password: '' };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;