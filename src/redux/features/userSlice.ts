import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
