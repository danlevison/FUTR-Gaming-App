import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
	GamesApiResponse,
	GeneralApiResponse,
	GameT,
	ScreenshotsT,
	PageItemT
} from "@/types"

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
		getGame: builder.query<GameT, { id: string }>({
			query: ({ id }: { id: string }) => `games/${id}?key=${rawgApiKey}`
		}),
		getGameScreenshots: builder.query<ScreenshotsT, { id: string }>({
			query: ({ id }) => `games/${id}/screenshots?key=${rawgApiKey}`
		}),
		getGameSeries: builder.query({
			query: ({ id }) => `games/${id}/game-series?key=${rawgApiKey}`
		}),

		getAllGenres: builder.query<GeneralApiResponse, {}>({
			query: () => `genres?key=${rawgApiKey}`
		}),
		getGenre: builder.query<PageItemT, { id: string }>({
			query: ({ id }) => `genres/${id}?key=${rawgApiKey}`
		}),
		getAllGenreGames: builder.query<
			GamesApiResponse,
			{ page: number; slug: string }
		>({
			query: ({ page, slug }) =>
				`games?key=${rawgApiKey}&ordering=popularity&page_size=40&page=${page}&genres=${slug}`
		}),

		getAllStores: builder.query<GeneralApiResponse, {}>({
			query: () => `stores?key=${rawgApiKey}`
		}),
		getStore: builder.query<PageItemT, { id: string }>({
			query: ({ id }) => `stores/${id}?key=${rawgApiKey}`
		}),
		getAllStoreGames: builder.query<
			GamesApiResponse,
			{ page: number; id: string }
		>({
			query: ({ page, id }) =>
				`games?key=${rawgApiKey}&ordering=popularity&page_size=40&page=${page}&stores=${id}`
		}),

		getAllPublishers: builder.query<GeneralApiResponse, { page: number }>({
			query: ({ page }: { page: number }) =>
				`publishers?page_size=40&page=${page}&key=${rawgApiKey}`
		}),
		getPublisher: builder.query<PageItemT, { id: string }>({
			query: ({ id }) => `publishers/${id}?key=${rawgApiKey}`
		}),
		getAllPublisherGames: builder.query<
			GamesApiResponse,
			{ page: number; slug: string }
		>({
			query: ({ page, slug }) =>
				`games?key=${rawgApiKey}&ordering=popularity&page_size=40&page=${page}&publishers=${slug}`
		})
	})
})

export const {
	useGetAllGamesQuery,
	useGetAllGenresQuery,
	useGetAllStoresQuery,
	useGetAllPublishersQuery,

	useGetGameQuery,
	useGetGameScreenshotsQuery,
	useGetGameSeriesQuery,

	useGetGenreQuery,
	useGetAllGenreGamesQuery,

	useGetStoreQuery,
	useGetAllStoreGamesQuery,

	useGetPublisherQuery,
	useGetAllPublisherGamesQuery
} = gamesApi

export default gamesApi.reducer
