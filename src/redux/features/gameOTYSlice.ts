import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "@/utils/status"
import { fetchGamesOfTheYear } from "../utils/gameOTYUtils"
import { GameT } from "@/types"

type GameStateT = {
	games: {
		results: GameT[]
		next: string | null
		previous: string | null
	}
	gamesStatus: string
	gameSingle: []
	gameSingleStatus: string
	gameDetails: []
}

const initialState: GameStateT = {
	games: {
		results: [],
		next: null,
		previous: null
	},
	gamesStatus: STATUS.IDLE,
	gameSingle: [],
	gameSingleStatus: STATUS.IDLE,
	gameDetails: []
}

const gameOTYSlice = createSlice({
	name: "gameOTY",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGamesOfTheYear.pending, (state) => {
				state.gamesStatus = STATUS.LOADING
			})
			.addCase(fetchGamesOfTheYear.fulfilled, (state, action) => {
				state.games = action.payload
				state.gamesStatus = STATUS.SUCCEEDED
			})
			.addCase(fetchGamesOfTheYear.rejected, (state) => {
				state.gamesStatus = STATUS.FAILED
			})
	}
})

export const gamesOTY = (state: { gameOTY: GameStateT }) =>
	state.gameOTY.games.results

export const gamesOTYStatus = (state: { gameOTY: GameStateT }) =>
	state.gameOTY.gamesStatus

export default gameOTYSlice.reducer
