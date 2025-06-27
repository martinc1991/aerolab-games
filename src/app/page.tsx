import { getPopularGames } from '@/services/igdb'

export default async function Home() {
	const populargames = await getPopularGames(10)

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				{populargames.map((game) => {
					return <p key={game.id}>{game.name}</p>
				})}
			</main>
			<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>footer</footer>
		</div>
	)
}
