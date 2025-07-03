'use server'

import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { getPopularGamesSuggestions, getSearchSuggestions } from '@/services/igdb'

export async function searchGameSuggestions(searchTerm: string, limit = 5): Promise<IGDBGameSearchSuggestion[]> {
	try {
		if (!searchTerm.trim() || searchTerm.length < 2) {
			return []
		}

		const results = await getSearchSuggestions(searchTerm, limit)

		return results
	} catch (error) {
		console.error('Failed to fetch game suggestions:', error)
		return []
	}
}

export async function getPopularGameSuggestions(limit = 5): Promise<IGDBGameSearchSuggestion[]> {
	try {
		const results = await getPopularGamesSuggestions(limit)
		return results
	} catch (error) {
		console.error('Failed to fetch popular games:', error)
		return []
	}
}
