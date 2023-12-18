import { createAsyncThunk } from "@reduxjs/toolkit"

const rawgApiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY

export const fetchGames = createAsyncThunk(
	"games/fetch",
	async ({ urlEndpoint, page }: { urlEndpoint: string; page: number }) => {
		try {
			const res = await fetch(
				`https://api.rawg.io/api/${urlEndpoint}&page=${page}&key=${rawgApiKey}`
			)
			const data = await res.json()
			return data
		} catch (error) {
			console.error(error)
		}
	}
)

export const fetchGameDetails = createAsyncThunk(
	"gameDetails/fetch",
	async (id) => {
		try {
			const res = await fetch(
				`https://api.rawg.io/api/games/${id}?key=${rawgApiKey}`
			)
			const data = await res.json()
			return data
		} catch (error) {
			console.error(error)
		}
	}
)
