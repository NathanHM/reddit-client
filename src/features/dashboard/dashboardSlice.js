import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        posts: []
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        clearPosts: (state, action) => {
            state.posts = [];
        }
    }
})

export const selectPosts = (state) => state.root.dashboard.posts;
export const { addPost, clearPosts } = dashboardSlice.actions;
export default dashboardSlice.reducer;