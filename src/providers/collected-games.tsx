'use client'

import { LoadingSpinner } from '@/components/loading-spinner'
import { useGameActions } from '@/lib/hooks/use-game-actions'
import { useGameSorting } from '@/lib/hooks/use-game-sorting'
import { useGameStorage } from '@/lib/hooks/use-game-storage'
import { useDefaultGameSuggestions } from '@/lib/hooks/use-game-suggestions'
import { useUrlSort } from '@/lib/hooks/use-url-sort'
import { IGDBGameDetails, IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { CollectedGame, SortBy } from '@/types'
import { createContext, Suspense, useContext, type ReactNode } from 'react'

export interface CollectedGamesState {
	sortBy: SortBy
	games: CollectedGame[]
	defaultSuggestions: IGDBGameSearchSuggestion[]
	isLoadingDefaultSuggestions: boolean
}

export interface GamesActions {
	setSortBy: (sortBy: SortBy) => void
	setDefaultSuggestions: (defaultSuggestions: IGDBGameSearchSuggestion[]) => void
	collectGame: (game: IGDBGameDetails) => void
	removeCollectedGame: (id: number, name: string) => void
	isGameCollected: (gameId: number) => boolean
}

export type CollectedGamesContextType = CollectedGamesState & GamesActions

const defaultState: CollectedGamesState = {
	sortBy: SortBy.LAST_ADDED,
	games: [],
	defaultSuggestions: [],
	isLoadingDefaultSuggestions: false,
}

const CollectedGamesContext = createContext<CollectedGamesContextType | undefined>(undefined)

export interface CollectedGamesProviderProps {
	children: ReactNode
	initialGames?: CollectedGame[]
}

function CollectedGamesProviderInner({ children }: { children: ReactNode }) {
	const gameStorage = useGameStorage()
	const { sortBy, setSortBy } = useUrlSort()
	const sortedGames = useGameSorting(gameStorage.games, sortBy)
	const { defaultSuggestions, setDefaultSuggestions, isLoading } = useDefaultGameSuggestions(gameStorage.games)
	const gameActions = useGameActions()

	const contextValue: CollectedGamesContextType = {
		sortBy,
		setSortBy,
		games: sortedGames,
		defaultSuggestions,
		setDefaultSuggestions,
		isLoadingDefaultSuggestions: isLoading,
		collectGame: gameActions.collectGame,
		removeCollectedGame: gameActions.removeCollectedGame,
		isGameCollected: gameActions.isGameCollected,
	}

	return <CollectedGamesContext.Provider value={contextValue}>{children}</CollectedGamesContext.Provider>
}

export function CollectedGamesProvider({ children }: CollectedGamesProviderProps) {
	return (
		<Suspense fallback={<Loading />}>
			<CollectedGamesProviderInner>{children}</CollectedGamesProviderInner>
		</Suspense>
	)
}

export function useCollectedGames() {
	const context = useContext(CollectedGamesContext)
	if (context === undefined) {
		throw new Error('useCollectedGames must be used within a CollectedGamesProvider')
	}
	return context
}

function Loading() {
	return (
		<div className='flex items-center justify-center h-[calc(100vh-200px)]'>
			<LoadingSpinner />
		</div>
	)
}
