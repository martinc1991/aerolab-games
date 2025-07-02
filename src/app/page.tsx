import { CollectedGamesGallery } from '@/components/collected-games'
import { SavedGamesFilters } from '@/components/saved-games-filters'
import { Title } from '@/components/typography/title'

export default async function Home() {
	return (
		<div className='space-y-4'>
			<div className='flex flex-col gap-4'>
				<Title>Saved Games</Title>
				<SavedGamesFilters />
			</div>
			<CollectedGamesGallery />
		</div>
	)
}
