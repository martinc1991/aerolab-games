import { GamesGallery } from '@/components/games-gallery'
import { Typography } from '@/components/typography'
import { IGDBGameDetails } from '@/lib/igdb/types'

interface SimilarGamesProps {
	games: IGDBGameDetails['similar_games']
}

export function SimilarGames(props: SimilarGamesProps) {
	return (
		<GamesGallery
			games={props.games}
			emptyState={<Typography.Muted className='text-sm font-medium'>No similar games available</Typography.Muted>}
		/>
	)
}
