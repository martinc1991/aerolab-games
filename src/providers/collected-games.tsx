'use client'

import { Logo } from '@/components/svg/logo'
import { getPopularGameSuggestions } from '@/lib/actions/game-actions'
import { useGameStorage } from '@/lib/hooks/use-game-storage'
import { IGDBGameDetails, IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { createContext, Suspense, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

enum SortBy {
	LAST_ADDED = 'last-added',
	NEWEST = 'newest',
	OLDEST = 'oldest',
}
const SORT_BY_PARAM = 'sortBy'

export interface CollectedGame {
	id: number
	dateCollected: number
	dateReleased: number
	name: string
	slug: string
	cover: { id: number; image_id: string }
}

export interface CollectedGamesState {
	sortBy: SortBy
	games: CollectedGame[]
	popularGames: IGDBGameSearchSuggestion[]
	isLoadingPopular: boolean
}

export interface GamesActions {
	setSortBy: (sortBy: SortBy) => void
	setPopularGames: (popularGames: IGDBGameSearchSuggestion[]) => void
	collectGame: (game: IGDBGameDetails) => void
	removeCollectedGame: (gameId: number) => boolean
	isGameCollected: (gameId: number) => boolean
}

export type CollectedGamesContextType = CollectedGamesState & GamesActions

const defaultState: CollectedGamesState = {
	sortBy: SortBy.LAST_ADDED,
	games: [],
	popularGames: [],
	isLoadingPopular: false,
}

const CollectedGamesContext = createContext<CollectedGamesContextType | undefined>(undefined)

export interface CollectedGamesProviderProps {
	children: ReactNode
	initialGames?: CollectedGame[]
}

const validSortBy = [SortBy.LAST_ADDED, SortBy.NEWEST, SortBy.OLDEST] as const

function isValidSortBy(value: string | null): value is SortBy {
	return value !== null && validSortBy.includes(value as SortBy)
}

function CollectedGamesProviderInner({ children }: { children: ReactNode }) {
	const gameStorage = useGameStorage()
	const router = useRouter()
	const searchParams = useSearchParams()

	const initialSortBy = (() => {
		const urlSortBy = searchParams.get(SORT_BY_PARAM)
		return isValidSortBy(urlSortBy) ? urlSortBy : defaultState.sortBy
	})()

	const [sortBy, setSortBy] = useState<SortBy>(initialSortBy)
	const [popularGames, setPopularGames] = useState<IGDBGameSearchSuggestion[]>(defaultState.popularGames)
	const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(defaultState.isLoadingPopular)

	const sortedGames = useMemo(() => {
		const gamesCopy = [...gameStorage.games]

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
	}, [gameStorage.games, sortBy])

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

	useEffect(() => {
		const urlSortBy = searchParams.get(SORT_BY_PARAM)

		if (urlSortBy && !isValidSortBy(urlSortBy)) {
			router.replace(window.location.pathname)
		}
	}, [searchParams, router])

	function handleSetSortBy(newSortBy: SortBy) {
		setSortBy(newSortBy)

		const current = new URLSearchParams(Array.from(searchParams.entries()))
		current.set(SORT_BY_PARAM, newSortBy)
		const search = current.toString()
		const query = search ? `?${search}` : ''

		router.replace(`${window.location.pathname}${query}`)
	}

	const contextValue: CollectedGamesContextType = {
		sortBy,
		setSortBy: handleSetSortBy,
		games: sortedGames,
		popularGames,
		setPopularGames,
		isLoadingPopular,
		collectGame: gameStorage.collectGame,
		removeCollectedGame: gameStorage.removeCollectedGame,
		isGameCollected: gameStorage.isGameCollected,
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
		<div className='flex items-center justify-center h-screen'>
			<div className='animate-spin'>
				<Logo />
			</div>
		</div>
	)
}
