import { createAsyncThunk } from "@reduxjs/toolkit"

const rawgApiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY

export const fetchGames = createAsyncThunk(
	"games/fetch",
	async (pageNum: number) => {
		const res = await fetch(
			`https://api.rawg.io/api/games?key=${rawgApiKey}&page=${pageNum}`
		)
		const data = await res.json()
		return data
	}
)

export const fetchGameDetails = createAsyncThunk(
	"gameDetails/fetch",
	async (id) => {
		const res = await fetch(
			`https://api.rawg.io/api/games/${id}?key=${rawgApiKey}`
		)
		const data = await res.json()
		return data
	}
)
