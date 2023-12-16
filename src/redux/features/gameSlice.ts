import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "@/utils/status"
import { fetchGameDetails, fetchGames } from "../utils/gameUtils"
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

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGames.pending, (state) => {
				state.gamesStatus = STATUS.LOADING
			})
			.addCase(fetchGames.fulfilled, (state, action) => {
				state.games = action.payload
				state.gamesStatus = STATUS.SUCCEEDED
			})
			.addCase(fetchGames.rejected, (state) => {
				state.gamesStatus = STATUS.FAILED
			})

		builder
			.addCase(fetchGameDetails.pending, (state) => {
				state.gameSingleStatus = STATUS.LOADING
			})
			.addCase(fetchGameDetails.fulfilled, (state, action) => {
				state.gameSingle = action.payload
				state.gameSingleStatus = STATUS.SUCCEEDED
			})
			.addCase(fetchGameDetails.rejected, (state) => {
				state.gameSingleStatus = STATUS.FAILED
			})
	}
})

export const games = (state: { game: GameStateT }) => state.game.games.results
export const gamesStatus = (state: { game: GameStateT }) =>
	state.game.gamesStatus
export const gamesNextPage = (state: { game: GameStateT }) =>
	state.game.games.next
export const gamesPrevPage = (state: { game: GameStateT }) =>
	state.game.games.previous

export default gameSlice.reducer
