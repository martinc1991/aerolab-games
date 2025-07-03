export const enum SortBy {
	LAST_ADDED = 'last-added',
	NEWEST = 'newest',
	OLDEST = 'oldest',
}
export const validSortBy = [SortBy.LAST_ADDED, SortBy.NEWEST, SortBy.OLDEST] as const

export interface CollectedGame {
	id: number
	dateCollected: number
	dateReleased: number
	name: string
	slug: string
	cover: { id: number; image_id: string }
}
