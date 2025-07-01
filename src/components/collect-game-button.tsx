'use client'

import { Button } from '@/components/ui/button'
import { IGDBGameDetails } from '@/lib/igdb/types'
import { useColectedGames } from '@/providers/collected-games'

interface CollectGameButtonProps {
	game: IGDBGameDetails
}

export function CollectGameButton(props: CollectGameButtonProps) {
	const { collectGame, isGameCollected } = useColectedGames()

	const isCollected = isGameCollected(props.game.id)

	function handleCollectGame() {
		collectGame(props.game)
	}

	return (
		<Button variant={isCollected ? 'collected' : 'collect'} onClick={handleCollectGame}>
			{isCollected ? 'Collected' : 'Collect game'}
		</Button>
	)
}
