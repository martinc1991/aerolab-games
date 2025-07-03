'use client'

import { GalleryGame, GamesGallery } from '@/components/games-gallery'
import { EmptyGames } from '@/components/svg/empty-games'
import { useCollectedGames } from '@/providers/collected-games'

export function CollectedGamesGallery() {
	const { games, removeCollectedGame } = useCollectedGames()

	function handleDelete(game: GalleryGame) {
		removeCollectedGame(game.id, game.name)
	}

	return <GamesGallery games={games} onDelete={handleDelete} emptyState={<EmptyState />} priority />
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
