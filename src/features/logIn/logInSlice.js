import { createSlice } from "@reduxjs/toolkit";

export const logInSlice = createSlice({
    name: 'logIn',
    initialState: {
        id: '',
        authCode: '',
        loggedIn: false
    },
    reducers: {
        setId: (state, action) => {
            const id = action.payload;
            state.id = id;
        },
        setAuthCode: (state, action) => {
            const authCode = action.payload;
            state.authCode = authCode;
        },
        setLoggedIn: (state, action) => {
            const loggedIn = action.payload;
            state.loggedIn = loggedIn;
        }
    }
})

export const selectId = (state) => state.root.logIn.id;
export const selectAuthCode = (state) => state.root.logIn.authCode;
export const selectLoggedIn = (state) => state.root.logIn.loggedIn;
export const { setId, setAuthCode, setLoggedIn } = logInSlice.actions;
export default logInSlice.reducer;