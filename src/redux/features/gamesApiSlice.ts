import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
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
		getGame: builder.query<GameT, string>({
			query: (id) => `games/${id}?key=${rawgApiKey}`
		}),
		getSearchedGame: builder.query<GamesApiResponse, string>({
			query: (searchInput: string) =>
				`games?key=${rawgApiKey}&search=${searchInput}&ordering=-added`
		}),
		getGameScreenshots: builder.query<ScreenshotsT, string>({
			query: (id) => `games/${id}/screenshots?key=${rawgApiKey}`
		}),
		getGameSeries: builder.query<GamesApiResponse, string>({
			query: (id) => `games/${id}/game-series?key=${rawgApiKey}`
		}),

		getAllGenres: builder.query<GeneralApiResponse, {}>({
			query: () => `genres?key=${rawgApiKey}`
		}),
		getGenre: builder.query<PageItemT, string>({
			query: (id) => `genres/${id}?key=${rawgApiKey}`
		}),
		getAllGenreGames: builder.query<
			GamesApiResponse,
			{ page: number; slug: string }
		>({
			query: ({ page, slug }) =>
				`games?key=${rawgApiKey}&ordering=popularity&page_size=40&page=${page}&genres=${slug}`
		}),

		getAllTags: builder.query<GeneralApiResponse, {}>({
			query: () => `tags?key=${rawgApiKey}`
		}),
		getTag: builder.query<PageItemT, string>({
			query: (id) => `tags/${id}?key=${rawgApiKey}`
		}),
		getAllTagGames: builder.query<
			GamesApiResponse,
			{ page: number; slug: string }
		>({
			query: ({ page, slug }) =>
				`games?key=${rawgApiKey}&ordering=popularity&page_size=40&page=${page}&tags=${slug}`
		}),

		getAllStores: builder.query<GeneralApiResponse, {}>({
			query: () => `stores?key=${rawgApiKey}`
		}),
		getStore: builder.query<PageItemT, string>({
			query: (id) => `stores/${id}?key=${rawgApiKey}`
		}),
		getAllStoreGames: builder.query<
			GamesApiResponse,
			{ page: number; id: string }
		>({
			query: ({ page, id }) =>
				`games?key=${rawgApiKey}&ordering=popularity&page_size=40&page=${page}&stores=${id}`
		}),

		getAllPublishers: builder.query<GeneralApiResponse, number>({
			query: (page) => `publishers?page_size=40&page=${page}&key=${rawgApiKey}`
		}),
		getPublisher: builder.query<PageItemT, string>({
			query: (id) => `publishers/${id}?key=${rawgApiKey}`
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
	useGetAllTagsQuery,
	useGetAllStoresQuery,
	useGetAllPublishersQuery,

	useGetGameQuery,
	useGetSearchedGameQuery,
	useGetGameScreenshotsQuery,
	useGetGameSeriesQuery,

	useGetGenreQuery,
	useGetAllGenreGamesQuery,

	useGetTagQuery,
	useGetAllTagGamesQuery,

	useGetStoreQuery,
	useGetAllStoreGamesQuery,

	useGetPublisherQuery,
	useGetAllPublisherGamesQuery
} = gamesApi

export default gamesApi.reducer
