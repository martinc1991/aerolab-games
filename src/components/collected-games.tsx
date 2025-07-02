'use client'

import { GamesGallery } from '@/components/games-gallery'
import { EmptyGames } from '@/components/svg/empty-games'
import { toast } from '@/components/toast'
import { useCollectedGames } from '@/providers/collected-games'

export function CollectedGamesGallery() {
	const { games, removeCollectedGame } = useCollectedGames()

	function handleDelete(game: { id: number; name: string }) {
		removeCollectedGame(game.id)
		toast({
			title: 'Game deleted',
			description: `${game.name} has been removed from your collection`,
		})
	}

	return <GamesGallery games={games} onDelete={handleDelete} emptyState={<EmptyState />} />
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
