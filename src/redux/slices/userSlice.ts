// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    token: string | null;
    userInfo: object | null; // Kullanıcı bilgileri için genel bir nesne
}

const initialState: UserState = {
    token: null,
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Token'ı ve kullanıcı bilgilerini ayarlama
        setUser: (state, action: PayloadAction<{ token: string; userInfo: object }>) => {
            state.token = action.payload.token;
            state.userInfo = action.payload.userInfo;

            // Token'ı localStorage'a kaydet
            localStorage.setItem('token', action.payload.token);
        },
        clearUser: (state) => {
            state.token = null;
            state.userInfo = null;

            // localStorage'dan token'ı kaldır
            localStorage.removeItem('token');
        },
    },
});


export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
