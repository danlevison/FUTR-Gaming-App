import { createSlice } from "@reduxjs/toolkit"

type AuthState = {
	user: { uid: string; displayName: string; email: string } | null
	isLoading: boolean
}

const initialState: AuthState = {
	user: null,
	isLoading: true
}

export const userSlice = createSlice({
	name: "user",
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

export const { googleLogin, googleLogout, setLoading } = userSlice.actions
