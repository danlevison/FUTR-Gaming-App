import { createSlice } from "@reduxjs/toolkit"

const initialState = { sidebarStatus: false }

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		setSidebarOpen: (state) => {
			state.sidebarStatus = true
		},
		setSidebarClose: (state) => {
			state.sidebarStatus = false
		}
	}
})

export const { setSidebarOpen, setSidebarClose } = sidebarSlice.actions

export default sidebarSlice.reducer
