import { CollectGameButton } from '@/components/collect-game-button'
import { GameImage } from '@/components/game-image'
import { Title } from '@/components/typography/title'
import { getGameBySlug } from '@/services/igdb/games/get-details'

interface GamePageProps {
	params: {
		slug: string
	}
}

export default async function GamePage({ params }: GamePageProps) {
	const { slug } = await params
	const game = await getGameBySlug(slug)

	if (!game) return <p>Game not found</p>

	return (
		<div className='space-y-4'>
			<div className='flex gap-4 items-center'>
				<GameImage imageId={game.cover.image_id} alt={game.name} className='w-1/3' />
				<div className='flex flex-col gap-2'>
					<Title>{game.name}</Title>
					<span>company</span>
					<CollectGameButton game={game} />
				</div>
			</div>
			<div>
				<CollectGameButton game={game} />
			</div>
			<div>badges</div>
			<div>summary</div>
			<div>platforms</div>
			<div>Media (gallery)</div>

			<div>Similar games </div>
			<div className='bg-green-300 p-4 rounded'>
				<p>
					Game ID: <span>{game.id}</span>
				</p>
				{game ? (
					<p>
						Game Name: <span>{game.name}</span>
					</p>
				) : (
					<p>Game not found</p>
				)}
			</div>
		</div>
	)
}
