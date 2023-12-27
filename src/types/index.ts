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
	released?: string
	background_image: string
	description?: string
	developers?: DeveloperT[]
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
	playtime?: number
	tags?: Tags
}

// types for genres/stores/publishers
export type GeneralApiResponse = {
	count: number
	next: string | null
	previous: string | null
	results: PageItemT[]
}

// types for a genre/store
export type PageItemT = {
	id: string
	image_background?: string
	name: string
	slug: string
	games_count?: number
	description?: string
	domain?: string
}

export type Ratings = {
	id: number
	title: string
	percent: number
}[]

export type ParentPlatform = {
	platform: {
		name: string
		id: number
	}
}[]

export type DeveloperT = {
	games_count: number
	id: number
	image_background: string
	name: string
	slug: string
}

export type Tags = {
	id: number
	slug: string
	name: string
}[]

export type ScreenshotsT = {
	count: number
	next: string | null
	previous: string | null
	results: ScreenshotT[]
}

export type ScreenshotT = {
	height: number
	id: number
	image: string
	is_deleted: boolean
	width: number
}

export type UserT = {
	uid: string
	displayName: string
	email: string
} | null

export type UserCollectionT = {
	id: string
	title: string
	description: string
	isPublic: boolean
	games: GameT[] | null
}
