import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./features/authSlice"

export const rootReducer = combineReducers({
	auth: authReducer
})
