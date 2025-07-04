'use client'

import { CollectedGame, SortBy } from '@/types'
import { useMemo } from 'react'

export function useGameSorting(games: CollectedGame[], sortBy: SortBy) {
	return useMemo(() => {
		const gamesCopy = [...games]
		return gamesCopy.sort((a, b) => {
			switch (sortBy) {
				case SortBy.NEWEST:
					return b.dateReleased - a.dateReleased
				case SortBy.OLDEST:
					return a.dateReleased - b.dateReleased
				case SortBy.LAST_ADDED:
				default:
					return b.dateCollected - a.dateCollected
			}
		})
	}, [games, sortBy])
}
