import { createSlice } from "@reduxjs/toolkit";

export const voteSlice = createSlice({
    name: 'vote',
    initialState: {
        votes: []
    },
    reducers: {
        addVote: (state, action) => {
            state.votes.push(action.payload);
        },
        clearVotes: (state, action) => {
            state.votes = [];
        },
        upvote: (state, action) => {
            state.votes.find(el => el.id === action.payload).upvoted = true;
            state.votes.find(el => el.id === action.payload).downvoted = false;
        },
        downvote: (state, action) => {
            state.votes.find(el => el.id === action.payload).downvoted = true;
            state.votes.find(el => el.id === action.payload).upvoted = false;
        }
    }
})

export const selectVotes = (state) => state.root.vote.votes;
export const selectVote = (id) => (state) => state.root.vote.votes.find(el => el.id === id);
export const { addVote, clearVotes, upvote, downvote, setCommentDownvoted } = voteSlice.actions;
export default voteSlice.reducer;