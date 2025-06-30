import { getGameById } from '@/services/igdb/gameService'

interface GamePageProps {
	params: {
		id: string
	}
}

export default async function GamePage({ params }: GamePageProps) {
	const { id } = await params
	const gameId = parseInt(id)

	const game = await getGameById(gameId)

	return (
		<div className='space-y-4'>
			<div>img, title, company and collect game on big screen</div>
			<div>collect game small screens </div>
			<div>badges</div>
			<div>summary</div>
			<div>platforms</div>
			<div>Media (gallery)</div>

			<div>Similar games </div>
			<div className='bg-green-300 p-4 rounded'>
				<p>
					Game ID: <span>{id}</span>
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
