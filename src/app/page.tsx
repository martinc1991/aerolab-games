import { CollectedGamesGallery } from '@/components/collected-games-gallery'
import { SavedGamesFilters } from '@/components/saved-games-filters'
import { Typography } from '@/components/typography'

export default async function Home() {
	return (
		<div className='space-y-4'>
			<Typography.H2>Saved Games</Typography.H2>
			<SavedGamesFilters />
			<CollectedGamesGallery />
		</div>
	)
}
