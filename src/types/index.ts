export type DataType = {
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
	genres?: DataType[]
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
