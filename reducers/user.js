import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { coordinate : {},
    connection : { username: '', token: '', firstname: '', lastname: '', birthdate: '', city: '', styles: [], artists: [], friends: [], likedFestivals: [], memoriesFestivals: [],
    picture: ''} },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value = { username: '', token: '', password: '' };
    },
    signupUser : (state, action) => {
      state.value = { ...state.value, ...action.payload };
    }
  },
});

export const { login, logout, signupUser} = userSlice.actions;
export default userSlice.reducer;