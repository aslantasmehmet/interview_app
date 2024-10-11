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
        setUser: (state, action: PayloadAction<{ token: string; userInfo: object }>) => {
            state.token = action.payload.token;
            state.userInfo = action.payload.userInfo;
        },
        clearUser: (state) => {
            state.token = null;
            state.userInfo = null;
        },
    },
});

// Slice'dan action ve reducer'ı dışa aktar
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;