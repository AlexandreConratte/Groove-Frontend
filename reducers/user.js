import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { coordinate : { longitude: null, latitude: null },
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
      state.value.connection = { ...state.value.connection, ...action.payload };
    },
    addCoordinate: (state, action) => {
      state.value.coordinate.longitude = action.payload.longitude;
      state.value.coordinate.latitude = action.payload.latitude;
    }
  },
});

export const { login, logout, signupUser, addCoordinate} = userSlice.actions;
export default userSlice.reducer;