import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducers"
import gamesApiReducer, { gamesApi } from "./features/gamesApiSlice"
import usersApiReducer, { usersApi } from "./features/usersApiSlice"
import collectionsApiReducer, {
	collectionsApi
} from "./features/collectionsApiSlice"

export const store = configureStore({
	reducer: {
		gamesApi: gamesApiReducer,
		usersApi: usersApiReducer,
		collectionsApi: collectionsApiReducer,
		data: rootReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			gamesApi.middleware,
			usersApi.middleware,
			collectionsApi.middleware
		])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
