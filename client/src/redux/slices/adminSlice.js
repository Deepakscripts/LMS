import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboard: null,
  },

  reducers: {
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
  },
});

export const { setDashboard } = adminSlice.actions;
export default adminSlice.reducer;
