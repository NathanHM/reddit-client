import { createSlice } from "@reduxjs/toolkit";

export const logInSlice = createSlice({
    name: 'logIn',
    initialState: {
        id: '',
        authCode: ''
    },
    reducers: {
        setId: (state, action) => {
            const id = action.payload;
            state.id = id;
        },
        setAuthCode: (state, action) => {
            const authCode = action.payload;
            state.authCode = authCode;
        }
    }
})

export const selectId = (state) => state.logIn.id;
export const selectAuthCode = (state) => state.logIn.authCode;
export const { setId, setAuthCode } = logInSlice.actions;
export default logInSlice.reducer;