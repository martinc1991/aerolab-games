import { toast } from '@/components/toast'
import { IGDBGameDetails } from '@/lib/igdb/types'
import { useCallback } from 'react'
import { useGameStorage } from './use-game-storage'

export function useGameActions() {
	const gameStorage = useGameStorage()

	const collectGame = useCallback(
		(game: IGDBGameDetails) => {
			gameStorage.collectGame(game)

			toast({
				title: 'Game collected',
				description: `${game.name} has been added to your collection.`,
			})
		},
		[gameStorage]
	)

	const removeCollectedGame = useCallback(
		(id: number, name: string) => {
			gameStorage.removeCollectedGame(id)

			toast({
				title: 'Game removed',
				description: `${name} has been removed from your collection`,
			})
		},
		[gameStorage]
	)

	return {
		collectGame,
		removeCollectedGame,
		isGameCollected: gameStorage.isGameCollected,
	}
}
