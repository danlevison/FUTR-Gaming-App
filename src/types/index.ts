export type GamesApiResponse = {
	count: number
	description: string
	filters: {
		years: Array<number>
	}
	next: string | null
	nofollow: boolean
	nofollow_collections: string[]
	noindex: boolean
	previous: string | null
	results: GameT[]
	seo_description: string
	seo_h1: string
	seo_keywords: string
	seo_title: string
}

export type GameT = {
	id?: string
	slug: string
	name: string
	released: string
	background_image: string
	description?: string
	genres?: PageItemT[]
	website?: string
	redditurl?: string
	ratings?: Ratings
	rating?: string
	rating_top?: string
	ratings_count?: string
	updated?: string
	metacritic?: number
	parent_platforms?: ParentPlatform
	tags?: Tags
}

export type GenresApiResponse = {
	count: number
	next: null
	prev: null
	results: PageItemT[]
}

// types for a genre/store
export type PageItemT = {
	id: string
	image_background: string
	name: string
	slug: string
	games_count: number
	description?: string
	domain?: string
}

export type StoresApiResponse = {
	count: number
	next: null
	prev: null
	results: PageItemT[]
}

export type Ratings = {
	title: string
	percent: number
}[]

export type ParentPlatform = {
	platform: {
		name: string
	}
}[]

export type Tags = {
	slug: string
	name: string
}[]
