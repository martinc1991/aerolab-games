import { CollectGameButton } from '@/components/collect-game-button'
import { ShareButton } from '@/components/share-button'
import { IGDBGameDetails } from '@/lib/igdb/types'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface GameActionsProps extends HTMLAttributes<HTMLDivElement> {
	game: IGDBGameDetails
}

export function GameActions({ game, className, ...props }: GameActionsProps) {
	return (
		<div className={cn('flex flex-col gap-3 min-w-fit', className)} {...props}>
			<ShareButton />
			<CollectGameButton game={game} />
		</div>
	)
}
