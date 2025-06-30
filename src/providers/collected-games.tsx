'use client'

import { getPopularGameSuggestions } from '@/lib/actions/game-actions'
import { IGDBGame } from '@/lib/igdb/types'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type TimeRange = 'last-added' | 'newest' | 'oldest'

export interface CollectedGamesState {
	sortBy: TimeRange
	popularGames: IGDBGame[]
	isLoadingPopular: boolean
}

export interface GamesFiltersActions {
	setSortBy: (sortBy: TimeRange) => void
	games: IGDBGame[]
	setGames: (games: IGDBGame[]) => void
}

export type CollectedGamesContextType = CollectedGamesState & GamesFiltersActions

const defaultState: CollectedGamesState = {
	sortBy: 'last-added',
	popularGames: [],
	isLoadingPopular: false,
}

const CollectedGamesContext = createContext<CollectedGamesContextType | undefined>(undefined)

export interface ColectedGamesProviderProps {
	children: ReactNode
	initialGames?: IGDBGame[]
}

export function ColectedGamesProvider({ children, initialGames = [] }: ColectedGamesProviderProps) {
	const [sortBy, setSortBy] = useState<TimeRange>(defaultState.sortBy)
	const [games, setGames] = useState<IGDBGame[]>(initialGames)
	const [popularGames, setPopularGames] = useState<IGDBGame[]>(defaultState.popularGames)
	const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(defaultState.isLoadingPopular)

	// Prefetch popular games on mount
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
	}, [])

	function handleSetSortBy(sortBy: TimeRange) {
		setSortBy(sortBy)
		// TODO: add rute params to share urls

		const sortedGames = [...games].sort((a, b) => {
			switch (sortBy) {
				case 'newest':
					return (b.first_release_date || 0) - (a.first_release_date || 0)
				case 'oldest':
					return (a.first_release_date || 0) - (b.first_release_date || 0)
				case 'last-added':
				default:
					return 0
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
