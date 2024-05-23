import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token : '' ,  
    coordinate : { longitude: null, latitude: null },
    connection : { username: '', firstname: '', lastname: '', birthdate: '', city: '', styles: [], artists: [], friends: [], likedFestivals: [], memoriesFestivals: [],
    picture: ''},
    likedFestivals : [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
     
    },
    logout: (state) => {
      state.value = {};
    },
    signupUser : (state, action) => {
      state.value.connection = { ...state.value.connection, ...action.payload };
    },
    addCoordinate: (state, action) => {
      state.value.coordinate.longitude = action.payload.longitude;
      state.value.coordinate.latitude = action.payload.latitude;
    },
    updateLikedFestival: (state, action) => {
      state.value.likedFestivals = (action.payload)
    },
  },
});

export const { login, logout, signupUser, addCoordinate, updateLikedFestival } = userSlice.actions;
export default userSlice.reducer;