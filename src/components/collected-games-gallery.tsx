'use client'

import Loading from '@/app/loading'
import { GalleryGame, GamesGallery } from '@/components/games-gallery'
import { EmptyGames } from '@/components/svg/empty-games'
import { Typography } from '@/components/typography'
import { useCollectedGames } from '@/providers/collected-games'

export function CollectedGamesGallery() {
	const { games, removeCollectedGame, collectedGamesLoaded } = useCollectedGames()

	function handleDelete(game: GalleryGame) {
		removeCollectedGame(game.id, game.name)
	}

	if (!collectedGamesLoaded) return <Loading />

	return <GamesGallery games={games} onDelete={handleDelete} emptyState={<EmptyState />} priority />
}

function EmptyState() {
	return (
		<div className='flex flex-col gap-6 items-center py-16'>
			<EmptyGames />

			<div className='flex flex-col gap-2 text-center'>
				<Typography.H3>Nothing collected yet</Typography.H3>
				<Typography.Muted className='text-sm'>Here you will see your collected games</Typography.Muted>
			</div>
		</div>
	)
}
