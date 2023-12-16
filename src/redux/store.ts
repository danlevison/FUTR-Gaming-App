import { configureStore } from "@reduxjs/toolkit"
import creatorReducer from "./features/creatorSlice"
import gameReducer from "./features/gameSlice"
import genreReducer from "./features/genreSlice"
import sidebarReducer from "./features/sidebarSlice"
import storeReducer from "./features/storeSlice"

export const store = configureStore({
	reducer: {
		creator: creatorReducer,
		game: gameReducer,
		genre: genreReducer,
		sidebar: sidebarReducer,
		store: storeReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
