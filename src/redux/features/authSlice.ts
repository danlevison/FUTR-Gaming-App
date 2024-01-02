import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

type AuthState = {
	user: {
		uid: string
		displayName: string
		email: string
		avatar: string
	} | null
	isLoading: boolean
}

const initialState: AuthState = {
	user: null,
	isLoading: true
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		googleLogin: (state, action) => {
			state.user = action.payload
		},
		googleLogout: (state) => {
			state.user = null
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		}
	}
})

export const { googleLogin, googleLogout, setLoading } = authSlice.actions

export default authSlice.reducer

export const currentUser = (state: RootState) => state.data.auth.user
export const isLoading = (state: RootState) => state.data.auth.isLoading
