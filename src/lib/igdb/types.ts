export interface IGDBGameDetails {
	id: number
	name: string
	slug: string
	summary: string
	cover: { id: number; image_id: string }
	first_release_date: number
	rating: number
	genres: Array<{ id: number; name: string }>
	platforms: Array<{ id: number; name: string }>
	screenshots: Array<{ id: number; image_id: string }>
	similar_games: Array<{
		id: number
		cover: { id: number; image_id: string }
		name: string
		slug: string
	}>
	involved_companies: Array<{
		id: number
		company: { id: number; name: string }
		developer: boolean
		publisher: boolean
	}>
}

export interface IGDBGameSearchSuggestion {
	id: number
	cover: { id: number; image_id: string }
	name: string
	slug: string
}
