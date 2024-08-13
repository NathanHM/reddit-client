import { combineReducers } from '@reduxjs/toolkit';
import logInReducer from '../features/logIn/logInSlice.js';
import dashboardReducer from '../features/dashboard/dashboardSlice.js'
import voteReducer from '../features/vote/voteSlice.js';

const rootReducer = combineReducers({
    logIn: logInReducer,
    dashboard: dashboardReducer,
    vote: voteReducer
});

export default rootReducer;