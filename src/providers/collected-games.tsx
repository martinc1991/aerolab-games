'use client'

import { getPopularGameSuggestions } from '@/lib/actions/game-actions'
import { useGameStorage } from '@/lib/hooks/use-game-storage'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type TimeRange = 'last-added' | 'newest' | 'oldest'

export interface CollectedGame {
	id: number
	dateCollected: number
	dateReleased: number
	name: string
	slug: string
	cover: { id: number; image_id: string }
}

export interface CollectedGamesState {
	sortBy: TimeRange
	games: CollectedGame[]
	popularGames: IGDBGameSearchSuggestion[]
	isLoadingPopular: boolean
}

export interface GamesFiltersActions {
	setSortBy: (sortBy: TimeRange) => void
	setGames: (games: CollectedGame[]) => void
	setPopularGames: (popularGames: IGDBGameSearchSuggestion[]) => void
}

export type CollectedGamesContextType = CollectedGamesState & GamesFiltersActions

const defaultState: CollectedGamesState = {
	sortBy: 'last-added',
	games: [],
	popularGames: [],
	isLoadingPopular: false,
}

const CollectedGamesContext = createContext<CollectedGamesContextType | undefined>(undefined)

export interface ColectedGamesProviderProps {
	children: ReactNode
	initialGames?: CollectedGame[]
}

export function ColectedGamesProvider({ children }: ColectedGamesProviderProps) {
	const gameStorage = useGameStorage()
	const [games, setGames] = useState<CollectedGame[]>(gameStorage.games)
	const [sortBy, setSortBy] = useState<TimeRange>(defaultState.sortBy)
	const [popularGames, setPopularGames] = useState<IGDBGameSearchSuggestion[]>(defaultState.popularGames)
	const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(defaultState.isLoadingPopular)

	useEffect(() => {
		async function fetchPopularGames() {
			setIsLoadingPopular(true)
			try {
				const results = await getPopularGameSuggestions()
				setPopularGames(results)
			} catch (error) {
				console.error('Failed to prefetch popular games:', error)
			} finally {
				setIsLoadingPopular(false)
			}
		}

		fetchPopularGames()

		handleSetSortBy('last-added')
	}, [])

	function handleSetSortBy(sortBy: TimeRange) {
		setSortBy(sortBy)
		// TODO: add rute params to share urls

		const sortedGames = games.sort((a, b) => {
			switch (sortBy) {
				case 'newest':
					return (b.dateReleased || 0) - (a.dateReleased || 0)
				case 'oldest':
					return (a.dateReleased || 0) - (b.dateReleased || 0)
				case 'last-added':
				default:
					return b.dateCollected - a.dateCollected
			}
		})

		setGames(sortedGames)
	}

	const contextValue: CollectedGamesContextType = {
		sortBy,
		setSortBy: handleSetSortBy,
		games,
		setGames,
		popularGames,
		setPopularGames,
		isLoadingPopular,
	}

	return <CollectedGamesContext.Provider value={contextValue}>{children}</CollectedGamesContext.Provider>
}

export function useColectedGames() {
	const context = useContext(CollectedGamesContext)
	if (context === undefined) {
		throw new Error('useGamesFilters must be used within a GamesFiltersProvider')
	}
	return context
}
