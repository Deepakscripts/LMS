import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import adminReducer from './slices/adminSlice';
import studentReducer from './slices/studentSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    admin: adminReducer,
    student: studentReducer,
  },
});
