import { configureStore } from "@reduxjs/toolkit"
import creatorReducer from "./features/creatorSlice"
import genreReducer from "./features/genreSlice"
import sidebarReducer from "./features/sidebarSlice"
import storeReducer from "./features/storeSlice"
import apiReducer, { gamesApi } from "./features/apiSlice"

export const store = configureStore({
	reducer: {
		creator: creatorReducer,
		gamesApi: apiReducer,
		genre: genreReducer,
		sidebar: sidebarReducer,
		store: storeReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(gamesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
