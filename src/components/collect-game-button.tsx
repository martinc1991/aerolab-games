'use client'

import { Button } from '@/components/ui/button'
import { TOAST_DURATION } from '@/config/constants'
import { IGDBGameDetails } from '@/lib/igdb/types'
import { cn } from '@/lib/utils'
import { useCollectedGames } from '@/providers/collected-games'
import { HTMLAttributes, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

interface CollectGameButtonProps extends HTMLAttributes<HTMLButtonElement> {
	game: IGDBGameDetails
}

export function CollectGameButton({ className, ...props }: CollectGameButtonProps) {
	const { collectGame, isGameCollected, removeCollectedGame, collectedGamesLoaded } = useCollectedGames()
	const [isDisabled, setIsDisabled] = useState(false)
	const debounceResetDisabled = useDebounceCallback(() => setIsDisabled(false), TOAST_DURATION)

	const isCollected = collectedGamesLoaded ? isGameCollected(props.game.id) : false

	async function handleClick() {
		if (isCollected) {
			removeCollectedGame(props.game.id, props.game.name)
		} else {
			collectGame(props.game)
		}

		setIsDisabled(true)
		debounceResetDisabled()
	}

	return (
		<Button
			variant={isCollected ? 'collected' : 'collect'}
			onClick={handleClick}
			className={cn('min-w-[200px]', className)}
			disabled={isDisabled}
		>
			{isCollected ? 'Remove from collection' : 'Collect game'}
		</Button>
	)
}
