'use client'

import { toast } from '@/components/toast'
import { Button } from '@/components/ui/button'
import { IGDBGameDetails } from '@/lib/igdb/types'
import { useCollectedGames } from '@/providers/collected-games'
import { HTMLAttributes } from 'react'

interface CollectGameButtonProps extends HTMLAttributes<HTMLButtonElement> {
	game: IGDBGameDetails
}

export function CollectGameButton({ className, ...props }: CollectGameButtonProps) {
	const { collectGame, isGameCollected } = useCollectedGames()

	const isCollected = isGameCollected(props.game.id)

	function handleCollectGame() {
		if (isCollected) return

		collectGame(props.game)
		toast({
			title: 'Game collected',
			description: `${props.game.name} has been added to your collection`,
		})
	}

	return (
		<Button variant={isCollected ? 'collected' : 'collect'} onClick={handleCollectGame} className={className}>
			{isCollected ? 'Collected' : 'Collect game'}
		</Button>
	)
}
