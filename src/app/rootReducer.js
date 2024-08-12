import { combineReducers } from '@reduxjs/toolkit';
import logInReducer from '../features/logIn/logInSlice.js';
import dashboardReducer from '../features/dashboard/dashboardSlice.js'

const rootReducer = combineReducers({
    logIn: logInReducer,
    dashboard: dashboardReducer
});

export default rootReducer;