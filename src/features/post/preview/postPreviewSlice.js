import { createSlice } from "@reduxjs/toolkit";

export const postPreviewSlice = createSlice({
    name: 'postPreview',
    initialState: {
        upvoted: false,
        downvoted: false
    },
    reducers: {

    }
})

export const selectUpvoted = state => state.root.postPreview.upvoted;
export const selectDownvoted = state => state.root.postPreview.downvoted;
export const { setUpvoted, setDownvoted } = postPreviewSlice.actions;
export default postPreviewSlice.reducer;