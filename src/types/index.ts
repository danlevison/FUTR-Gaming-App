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

export type Genres = {
	id?: number
	name: string
	slug: string
	description: string
	games_count: number
	image_background: string
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

export type GameT = {
	id?: string
	slug: string
	name: string
	released: string
	background_image: string
	description?: string
	genres?: Genres[]
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
