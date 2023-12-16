import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const storeSlice = createSlice({
	name: "store",
	initialState,
	reducers: {},
	extraReducers(builder) {}
})

export default storeSlice.reducer
