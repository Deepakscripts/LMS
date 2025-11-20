import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    courses: [],
  },

  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses } = studentSlice.actions;
export default studentSlice.reducer;
