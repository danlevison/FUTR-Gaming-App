import { createAsyncThunk } from "@reduxjs/toolkit"

const rawgApiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY

export const fetchGamesOfTheYear = createAsyncThunk(
	"games/fetch",
	async (pageNum: number) => {
		try {
			const res = await fetch(
				`https://api.rawg.io/api/games/lists/greatest?key=${rawgApiKey}&page_size=12`
			)
			const data = await res.json()
			return data
		} catch (error) {
			console.error(error)
		}
	}
)
