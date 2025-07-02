import { GamesGallery } from '@/components/games-gallery'
import { IGDBGameDetails } from '@/lib/igdb/types'

interface SimilarGamesProps {
	games: IGDBGameDetails['similar_games']
}

export function SimilarGames(props: SimilarGamesProps) {
	return (
		<GamesGallery
			games={props.games}
			emptyState={<p className='text-sm font-medium leading-5 text-[#666666]'>No similar games available</p>}
		/>
	)
}
