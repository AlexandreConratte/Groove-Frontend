import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token : "",  
    coordinate : { longitude: null, latitude: null },
    connection : { username: '', firstname: '', lastname: '', birthdate: '', city: '', styles: [], artists: [], friends: [], likedFestivals: [], memoriesFestivals: [],
    picture: ''},
    likedFestivals : [],
    memoriesFestivals : [], 
    settings: { nightMode: false, notifications: false }
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;  
    },
    logout: (state) => {
      state.value = { token : "",  
      coordinate : { longitude: null, latitude: null },
      connection : { username: '', firstname: '', lastname: '', birthdate: '', city: '', styles: [], artists: [], friends: [], likedFestivals: [], memoriesFestivals: [],
      picture: ''},
      likedFestivals : [],
      memoriesFestivals : [], 
      settings: { nightMode: false, notifications: false } };
    },
    signupUser : (state, action) => {
      state.value.connection = { ...state.value.connection, ...action.payload };
    },
    addCoordinate: (state, action) => {
      state.value.coordinate.longitude = action.payload.longitude;
      state.value.coordinate.latitude = action.payload.latitude;
      
    },
    resetdataFields: (state) => {
      state.value.connection = {
        firstname: '',
        lastname: '',
        birthdate: '',
        city: '',
        styles: [],
        artists: [],
        picture: '', 
      };},
    updateLikedFestival: (state, action) => {
      state.value.likedFestivals = (action.payload)
    },
    updateMemoriesFestival: (state, action) => {
      state.value.memoriesFestivals = (action.payload)
    },
    updateNightMode: (state, action) => {
      state.value.settings.nightMode = (action.payload)
    }
  },
});
  
export const { login, logout, signupUser, addCoordinate, updateLikedFestival, updateMemoriesFestival, resetdataFields, updateNightMode } = userSlice.actions;
export default userSlice.reducer;