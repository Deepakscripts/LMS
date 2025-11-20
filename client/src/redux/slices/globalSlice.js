import { createSlice } from '@reduxjs/toolkit';

const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user');

const initialState = {
  token: savedToken || null,
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,

  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },

    logout: state => {
      state.token = null;
      state.user = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = globalSlice.actions;
export default globalSlice.reducer;
