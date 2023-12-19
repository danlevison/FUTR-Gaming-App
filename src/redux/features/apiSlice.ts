import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { GamesApiResponse, GeneralApiResponse } from "@/types"

const rawgApiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY

export const gamesApi = createApi({
	reducerPath: "gamesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.rawg.io/api/" }),
	endpoints: (builder) => ({
		getAllGames: builder.query<
			GamesApiResponse,
			{ urlEndpoint: string; option: string; page: number }
		>({
			query: ({
				urlEndpoint,
				option,
				page
			}: {
				urlEndpoint: string
				option: string
				page: number
			}) => `${urlEndpoint}&ordering=-${option}&page=${page}&key=${rawgApiKey}`
		}),
		getGame: builder.query({
			query: () => ``
		}),

		getAllGenres: builder.query<GeneralApiResponse, {}>({
			query: () => `genres?key=${rawgApiKey}`
		}),

		getAllStores: builder.query<GeneralApiResponse, {}>({
			query: () => `stores?key=${rawgApiKey}`
		}),

		getAllPublishers: builder.query<GeneralApiResponse, { page: number }>({
			query: ({ page }: { page: number }) =>
				`publishers?page_size=40&page=${page}&key=${rawgApiKey}`
		})
	})
})

export const {
	useGetAllGamesQuery,
	useGetAllGenresQuery,
	useGetAllStoresQuery,
	useGetAllPublishersQuery
} = gamesApi

export default gamesApi.reducer
