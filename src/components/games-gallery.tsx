'use client'

import { EmptyGames } from '@/components/empty-games'
import { TrashCan } from '@/components/trash-can'
import { IGDBGame } from '@/lib/igdb/types'
import { useColectedGames } from '@/providers/collected-games'
import { getIGDBImageUrl } from '@/services/igdb'
import Image from 'next/image'

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

function GameCard({ game }: { game: IGDBGame }) {
	return (
		<div className='relative'>
			<Image
				src={getIGDBImageUrl(game.cover?.image_id ?? '', '720p')}
				// TODO: improve loading
				// placeholder='blur'
				// blurDataURL={getIGDBImageUrl(game.cover?.image_id ?? '', 'thumb')}
				alt={game.name}
				width={264}
				height={374}
				className='object-cover rounded-[8px]'
				onClick={() => {
					console.log(game.name)
				}}
			/>
			<div
				className='absolute bottom-2 right-2 cursor-pointer hover:opacity-80 transition-opacity duration-200'
				onClick={(e) => {
					e.preventDefault()
					console.log('Delete', game.name)
				}}
			>
				<TrashCan />
			</div>
		</div>
	)
}
