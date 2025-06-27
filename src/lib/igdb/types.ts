export interface IGDBCover {
	image_id: string
	url?: string
	width?: number
	height?: number
}

export interface IGDBGame {
	id: number
	name: string
	first_release_date?: number
	cover?: IGDBCover
	summary?: string
	storyline?: string
	total_rating?: number
	total_rating_count?: number
	genres?: IGDBGenre[]
	platforms?: IGDBPlatform[]
	screenshots?: IGDBScreenshot[]
}

export interface IGDBGenre {
	id: number
	name: string
}

export interface IGDBPlatform {
	id: number
	name: string
	abbreviation?: string
}

export interface IGDBScreenshot {
	id: number
	image_id: string
	url?: string
	width?: number
	height?: number
}

export interface IGDBSearchResult {
	games: IGDBGame[]
	total: number
}

export interface IGDBCompany {
	id: number
	name: string
	description?: string
	logo?: IGDBCover
}

export interface IGDBGameDetails extends IGDBGame {
	age_ratings?: IGDBAgeRating[]
	involved_companies?: IGDBInvolvedCompany[]
	release_dates?: IGDBReleaseDate[]
	similar_games?: IGDBGame[]
	websites?: IGDBWebsite[]
}

export interface IGDBAgeRating {
	id: number
	category: number
	rating: number
	content_descriptions?: number[]
}

export interface IGDBInvolvedCompany {
	id: number
	company: IGDBCompany
	developer: boolean
	publisher: boolean
}

export interface IGDBReleaseDate {
	id: number
	date: number
	platform: IGDBPlatform
	region: number
}

export interface IGDBWebsite {
	id: number
	category: number
	url: string
}
