import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./features/authSlice"
import userProfileIdReducer from "./features/userProfileIdSlice"

export const rootReducer = combineReducers({
	auth: authReducer,
	userProfileId: userProfileIdReducer
})
