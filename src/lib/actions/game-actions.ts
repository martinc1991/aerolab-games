'use server'

import type { IGDBGame } from '@/lib/igdb/types'
import { getPopularGames, getSearchSuggestions } from '@/services/igdb/gameService'

export async function searchGameSuggestions(searchTerm: string): Promise<IGDBGame[]> {
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

export async function getPopularGameSuggestions(): Promise<IGDBGame[]> {
	try {
		const results = await getPopularGames(5)
		return results
	} catch (error) {
		console.error('Failed to fetch popular games:', error)
		return []
	}
}
