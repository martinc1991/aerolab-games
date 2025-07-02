'use client'

import { GameImage } from '@/components/game-image'
import { TrashCan } from '@/components/svg/trash-can'
import { useAppNavigation } from '@/lib/hooks/use-app-navigation'

interface GalleryGame {
	id: number
	slug: string
	cover: { id: number; image_id: string }
	name: string
}

interface GamesGalleryProps {
	games: GalleryGame[]
	onDelete?: (game: GalleryGame) => void
	emptyState?: React.ReactNode
	priority?: boolean
}

export function GamesGallery({ games, onDelete, emptyState = null, priority = false }: GamesGalleryProps) {
	if (games.length === 0 && emptyState) return emptyState

	return (
		<div className='grid grid-cols-3 md:grid-cols-4 justify-items-center w-full md:max-w-[728px] gap-2'>
			{games.map((game) => (
				<div key={game.id}>
					<GameCard id={game.id} slug={game.slug} cover={game.cover} name={game.name} onDelete={onDelete} priority={priority} />
				</div>
			))}
		</div>
	)
}

interface GameCardProps extends GalleryGame {
	onDelete?: (game: GalleryGame) => void
	priority?: boolean
}

function GameCard(props: GameCardProps) {
	const { navigateToGame } = useAppNavigation()

	function handleClick() {
		navigateToGame(props.slug)
	}

	return (
		<div className='relative cursor-pointer'>
			<GameImage imageId={props.cover.image_id} alt={props.name} onClick={handleClick} priority={props.priority} />
			{props.onDelete && (
				<div
					className='absolute bottom-2 right-2 hover:opacity-80 transition-opacity duration-200'
					onClick={(e) => {
						e.stopPropagation()
						props.onDelete?.({
							id: props.id,
							slug: props.slug,
							cover: props.cover,
							name: props.name,
						})
					}}
				>
					<TrashCan />
				</div>
			)}
		</div>
	)
}
