'use client'

import { Button } from '@/components/ui/button'
import { useGameStorage } from '@/lib/hooks/use-game-storage'
import { IGDBGame } from '@/lib/igdb/types'

interface CollectGameButtonProps {
	game: IGDBGame
}

export function CollectGameButton(props: CollectGameButtonProps) {
	const { collectGame, isGameCollected } = useGameStorage()

	const isCollected = isGameCollected(props.game.id)

	return (
		<Button variant={isCollected ? 'collected' : 'collect'} onClick={(e) => collectGame(props.game)}>
			{isCollected ? 'Collected' : 'Collect game'}
		</Button>
	)
}
