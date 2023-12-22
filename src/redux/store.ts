import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducers"
import apiReducer, { gamesApi } from "./features/apiSlice"

export const store = configureStore({
	reducer: {
		gamesApi: apiReducer,
		data: rootReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(gamesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
