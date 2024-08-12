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
        },
        setUpvoted: (state, action) => {
            const { bool, id } = action.payload;
            state.posts.find(el => el.data.id === id).upvoted = bool;
        },
        setDownvoted: (state, action) => {
            const { bool, id } = action.payload;
            state.posts.find(el => el.data.id === id).downvoted = bool;
        }
    }
})

export const selectPosts = (state) => state.root.dashboard.posts;
export const selectDownvoted = (id) => (state) => state.root.dashboard.posts.find(el => el.data.id === id).downvoted;
export const selectUpvoted = (id) => (state) => state.root.dashboard.posts.find(el => el.data.id === id).upvoted;
export const { addPost, clearPosts, setUpvoted, setDownvoted } = dashboardSlice.actions;
export default dashboardSlice.reducer;