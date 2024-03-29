import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducers"
import gamesApiReducer, { gamesApi } from "./features/gamesApiSlice"
import usersApiReducer, { usersApi } from "./features/usersApiSlice"
import collectionsApiReducer, {
	collectionsApi
} from "./features/collectionsApiSlice"
import wishlistApiReducer, { wishlistApi } from "./features/wishlistApiSlice"
import friendsApiReducer, { friendsApi } from "./features/friendsApiSlice"
import messagesApiReducer, { messagesApi } from "./features/messagesApiSlice"

export const store = configureStore({
	reducer: {
		gamesApi: gamesApiReducer,
		usersApi: usersApiReducer,
		collectionsApi: collectionsApiReducer,
		wishlistApi: wishlistApiReducer,
		friendsApi: friendsApiReducer,
		messagesApi: messagesApiReducer,
		data: rootReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			gamesApi.middleware,
			usersApi.middleware,
			collectionsApi.middleware,
			wishlistApi.middleware,
			friendsApi.middleware,
			messagesApi.middleware
		])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
