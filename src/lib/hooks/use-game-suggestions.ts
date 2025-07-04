'use client'

import { getPopularGameSuggestions, getRelatedGameSuggestions } from '@/lib/actions/game-actions'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { getRandomElement } from '@/lib/utils'
import { CollectedGame } from '@/types'
import { useEffect, useState } from 'react'

export function useDefaultGameSuggestions(games: CollectedGame[]) {
	const [defaultSuggestions, setDefaultSuggestions] = useState<IGDBGameSearchSuggestion[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		async function fetchSuggestions() {
			setIsLoading(true)
			try {
				let results: IGDBGameSearchSuggestion[] = []

				if (games.length === 0) {
					results = await getPopularGameSuggestions()
				} else {
					const randomGameId = getRandomElement(games).id
					results = await getRelatedGameSuggestions(randomGameId, 5)
				}

				setDefaultSuggestions(results)
			} catch (error) {
				console.error('Failed to fetch suggestions:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchSuggestions()
	}, [games.length])

	return {
		defaultSuggestions,
		setDefaultSuggestions,
		isLoading,
	}
}
