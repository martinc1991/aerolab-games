import { getPopularGames } from '@/services/igdb'
import Link from 'next/link'

export default async function Home() {
	const populargames = await getPopularGames(10)

	return (
		<div className='space-y-4'>
			<div className='bg-blue-300 w-full'>saved games or empty state</div>
			<div className='flex gap-2'>
				{/* DELETE: just for testing */}
				<Link href='/game'>
					<button className='bg-amber-300 px-3 py-2 rounded transition-colors'>Game 123</button>
				</Link>
			</div>
		</div>
	)
}
