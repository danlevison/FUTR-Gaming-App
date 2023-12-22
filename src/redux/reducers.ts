import { combineReducers } from "@reduxjs/toolkit"
import { userSlice } from "./features/userSlice"

export const rootReducer = combineReducers({
	user: userSlice.reducer
})
