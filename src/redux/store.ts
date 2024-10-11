// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice'; 

const store = configureStore({
    reducer: {
        user: userReducer, // User durumu için reducer
        auth: authReducer, // Auth durumu için reducer
    },
});

export default store;
