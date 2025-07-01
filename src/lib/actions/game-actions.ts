'use server'

import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { getPopularGamesSuggestions, getSearchSuggestions } from '@/services/igdb'

export async function searchGameSuggestions(searchTerm: string): Promise<IGDBGameSearchSuggestion[]> {
	try {
		if (!searchTerm.trim() || searchTerm.length < 2) {
			return []
		}

		const results = await getSearchSuggestions(searchTerm, 5)

		return results
	} catch (error) {
		console.error('Failed to fetch game suggestions:', error)
		return []
	}
}

export async function getPopularGameSuggestions(): Promise<IGDBGameSearchSuggestion[]> {
	try {
		const results = await getPopularGamesSuggestions(5)
		return results
	} catch (error) {
		console.error('Failed to fetch popular games:', error)
		return []
	}
}
