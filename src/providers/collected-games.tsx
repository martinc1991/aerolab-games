'use client'

import { IGDBGame } from '@/lib/igdb/types'
import { createContext, useContext, useState, type ReactNode } from 'react'

export type TimeRange = 'last-added' | 'newest' | 'oldest'

export interface CollectedGamesState {
	sortBy: TimeRange
}

export interface GamesFiltersActions {
	setSortBy: (sortBy: TimeRange) => void
	games: IGDBGame[]
	setGames: (games: IGDBGame[]) => void
}

export type CollectedGamesContextType = CollectedGamesState & GamesFiltersActions

const defaultState: CollectedGamesState = {
	sortBy: 'last-added',
}

const CollectedGamesContext = createContext<CollectedGamesContextType | undefined>(undefined)

export interface ColectedGamesProviderProps {
	children: ReactNode
	initialGames?: IGDBGame[]
}

export function ColectedGamesProvider({ children, initialGames = [] }: ColectedGamesProviderProps) {
	const [sortBy, setSortBy] = useState<TimeRange>(defaultState.sortBy)
	const [games, setGames] = useState<IGDBGame[]>(initialGames)

	function handleSetSortBy(sortBy: TimeRange) {
		setSortBy(sortBy)
		// TODO: add rute params to share urls
	}

	const contextValue: CollectedGamesContextType = {
		sortBy,
		setSortBy: handleSetSortBy,
		games,
		setGames,
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
