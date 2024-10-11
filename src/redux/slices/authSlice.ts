// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    tokenExpiration: number | null; // Token süresi için ek alan
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    tokenExpiration: null, // Başlangıçta null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<{ token: string; expiration: number }>) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.tokenExpiration = action.payload.expiration; // Token süresini kaydet
        },
        loginFail: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.tokenExpiration = null; // Oturum kapatıldığında süresi de sıfırlanır
        },
    },
});

export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
