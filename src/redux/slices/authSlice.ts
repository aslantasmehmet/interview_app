// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state) => {
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFail: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

// Slice'dan action ve reducer'ı dışa aktar
export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
