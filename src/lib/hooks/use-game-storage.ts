import { LOCAL_STORAGE_COLLECTED_GAMES_KEY } from '@/config/constants'
import { IGDBGameDetails } from '@/lib/igdb/types'
import { CollectedGame } from '@/providers/collected-games'
import { useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export interface UseCollectedGamesReturn {
	games: CollectedGame[]
	collectGame: (game: IGDBGameDetails) => boolean
	removeCollectedGame: (gameId: number) => boolean
	isGameCollected: (gameId: number) => boolean
}

/**
 * Custom hook for managing collected games using localStorage
 * Provides reactive state management for game collection with all CRUD operations
 *
 * @returns UseCollectedGamesReturn object with state and actions
 */
export function useGameStorage(): UseCollectedGamesReturn {
	const [collectedGames, setCollectedGames] = useLocalStorage<CollectedGame[]>(LOCAL_STORAGE_COLLECTED_GAMES_KEY, [])

	const collectGame = useCallback(
		(game: IGDBGameDetails): boolean => {
			const isAlreadyCollected = collectedGames.some((cgame) => cgame.id === game.id)

			if (isAlreadyCollected) {
				console.info(`Game ${game.id} is already collected`)
				return false
			}

			const newGame: CollectedGame = {
				id: game.id,
				dateCollected: Date.now(),
				dateReleased: game.first_release_date,
				name: game.name,
				slug: game.slug,
				cover: {
					id: game.cover.id,
					image_id: game.cover.image_id,
				},
			}

			setCollectedGames((prev) => [...prev, newGame])
			return true
		},
		[collectedGames, setCollectedGames]
	)

	const removeCollectedGame = useCallback(
		(gameId: number): boolean => {
			const gameExists = collectedGames.some((game) => game.id === gameId)
			if (!gameExists) {
				console.info(`Game ${gameId} is not in the collection`)
				return false
			}

			setCollectedGames((prev) => prev.filter((game) => game.id !== gameId))
			return true
		},
		[collectedGames, setCollectedGames]
	)

	const isGameCollected = useCallback(
		(gameId: number): boolean => {
			return collectedGames.some((game) => game.id === gameId)
		},
		[collectedGames]
	)

	return {
		games: collectedGames,
		collectGame,
		removeCollectedGame,
		isGameCollected,
	}
}
