import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { GamesApiResponse } from "@/types"

const rawgApiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY

export const gamesApi = createApi({
	reducerPath: "gamesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.rawg.io/api/" }),
	endpoints: (builder) => ({
		getAllGames: builder.query<
			GamesApiResponse,
			{ urlEndpoint: string; page: number }
		>({
			query: ({ urlEndpoint, page }: { urlEndpoint: string; page: number }) =>
				`${urlEndpoint}&page=${page}&key=${rawgApiKey}`
		}),
		getGame: builder.query({
			query: () => ``
		})
	})
})

export const { useGetAllGamesQuery } = gamesApi

export default gamesApi.reducer
