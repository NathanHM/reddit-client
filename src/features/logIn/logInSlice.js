import { createSlice } from "@reduxjs/toolkit";

export const logInSlice = createSlice({
    name: 'logIn',
    initialState: {
        id: ''
    },
    reducers: {
        setId: (state, action) => {
            const id = action.payload;
            state.id = id;
        }
    }
})

export const getId = (state) => state.logIn.id;
export const { setId } = logInSlice.actions;
export default logInSlice.reducer;