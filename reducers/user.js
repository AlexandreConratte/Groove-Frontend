import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: '', token: '', coordinate: { longitude: null, latitude: null } }
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
    addCoordinate: (state, action) => {
      state.value.coordinate.longitude = action.payload.longitude;
      state.value.coordinate.latitude = action.payload.latitude;
    }
  },
});

export const { login, logout,addCoordinate } = userSlice.actions;
export default userSlice.reducer;