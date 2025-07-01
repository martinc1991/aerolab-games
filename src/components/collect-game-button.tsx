'use client'

import { toast } from '@/components/toast'
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
		toast({
			title: 'Game collected',
			description: `${props.game.name} has been added to your collection`,
		})
	}

	return (
		<Button variant={isCollected ? 'collected' : 'collect'} onClick={handleCollectGame}>
			{isCollected ? 'Collected' : 'Collect game'}
		</Button>
	)
}
