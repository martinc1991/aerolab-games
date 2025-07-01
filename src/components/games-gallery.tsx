'use client'

import { EmptyGames } from '@/components/empty-games'
import { GameImage } from '@/components/game-image'
import { toast } from '@/components/toast'
import { TrashCan } from '@/components/trash-can'
import { useAppNavigation } from '@/lib/hooks/use-app-navigation'
import { CollectedGame, useColectedGames } from '@/providers/collected-games'

export function GamesGallery() {
	const { games } = useColectedGames()

	if (games.length === 0) {
		return <EmptyState />
	}

	return (
		<div className='flex justify-center'>
			<div className='grid grid-cols-3 md:grid-cols-4 justify-items-center w-full max-w-[358px] md:max-w-[728px] gap-2'>
				{games.map((game) => (
					<div key={game.id}>
						<GameCard game={game} />
					</div>
				))}
			</div>
		</div>
	)
}

function EmptyState() {
	return (
		<div className='flex flex-col gap-6 items-center'>
			<EmptyGames />

			<div className='flex flex-col gap-2 text-center'>
				<span className='text-[16px] font-semibold'>Nothing collected yet</span>
				<span className='text-sm text-muted-foreground'>Here you will see your collected games</span>
			</div>
		</div>
	)
}

function GameCard({ game }: { game: CollectedGame }) {
	const { navigateToGame } = useAppNavigation()
	const { removeCollectedGame } = useColectedGames()

	function handleClick() {
		navigateToGame(game.slug)
	}

	function handleRemoveGame() {
		removeCollectedGame(game.id)
		toast({
			title: 'Game deleted',
			description: `${game.name} has been removed from your collection`,
		})
	}

	return (
		<div className='relative cursor-pointer'>
			<GameImage imageId={game.cover.image_id} alt={game.name} onClick={handleClick} />
			<div
				className='absolute bottom-2 right-2 hover:opacity-80 transition-opacity duration-200'
				onClick={(e) => {
					e.stopPropagation()
					handleRemoveGame()
				}}
			>
				<TrashCan />
			</div>
		</div>
	)
}
