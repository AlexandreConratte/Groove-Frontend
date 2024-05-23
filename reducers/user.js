import { createSlice } from '@reduxjs/toolkit';

const initialState = {
<<<<<<< HEAD
  value: { token : "",  
=======
  value: { token : '' ,  
>>>>>>> a89c022d4b025fe2ca6f3aad19a1a0e69c3e34bc
    coordinate : { longitude: null, latitude: null },
    connection : { username: '', firstname: '', lastname: '', birthdate: '', city: '', styles: [], artists: [], friends: [], likedFestivals: [], memoriesFestivals: [],
    picture: ''},
    likedFestivals : [],
    memoriesFestivals : [], },
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
<<<<<<< HEAD
      
    },
    resetDatas: (state) => {
      state.value.connection = {
        username: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        city: '',
        styles: [],
        artists: [],
        picture: ''
      };}
  },
});

export const { login, logout, signupUser, addCoordinate, resetDatas} = userSlice.actions;
=======
    },
    updateLikedFestival: (state, action) => {
      state.value.likedFestivals = (action.payload)
    },
    updateMemoriesFestival: (state, action) => {
      state.value.memoriesFestivals = (action.payload)
    }
  },
});

export const { login, logout, signupUser, addCoordinate, updateLikedFestival, updateMemoriesFestival } = userSlice.actions;
>>>>>>> a89c022d4b025fe2ca6f3aad19a1a0e69c3e34bc
export default userSlice.reducer;