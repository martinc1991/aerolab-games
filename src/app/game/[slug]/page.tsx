import { Badge } from '@/components/badge'
import { CollectGameButton } from '@/components/collect-game-button'
import { GameImage } from '@/components/game-image'
import { ScreenshotCarousel } from '@/components/screenshots-carousel'
import { SimilarGames } from '@/components/similar-games'
import { CalendarIcon } from '@/components/svg/calendar-icon'
import { PuzzlePieceIcon } from '@/components/svg/puzzle-piece-icon'
import { StarIcon } from '@/components/svg/star-icon'
import { Title } from '@/components/typography/title'
import { formatIGDBRating, formatIGDBTimestamp } from '@/lib/utils'
import { getGameBySlug } from '@/services/igdb/games/get-details'
import { getIGDBImageUrl } from '@/services/igdb/imageService'
import type { Metadata } from 'next'

interface GamePageProps {
	params: Promise<{
		slug: string
	}>
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
	const { slug } = await params
	const game = await getGameBySlug(slug)

	if (!game) {
		return {
			title: 'Game Not Found',
			description: 'The requested game could not be found.',
		}
	}

	const developer = game.involved_companies.find((company) => company.developer)?.company.name
	const genres = game.genres.map((genre) => genre.name).join(', ')
	const platforms = game.platforms.map((platform) => platform.name).join(', ')
	const rating = formatIGDBRating(game.rating)
	const releaseDate = formatIGDBTimestamp(game.first_release_date)

	const coverImageUrl = game.cover?.image_id ? getIGDBImageUrl(game.cover.image_id, 'cover_big') : null

	const description = `Collect ${game.name}${developer ? ` by ${developer}` : ''}.`
	const title = `${game.name} | Aerolab Games`

	return {
		title,
		description,
		keywords: [
			game.name,
			...(developer ? [developer] : []),
			...game.genres.map((genre) => genre.name),
			...game.platforms.map((platform) => platform.name),
			'games',
			'gaming',
			'video games',
		],
		openGraph: {
			title,
			description,
			type: 'website',
			...(coverImageUrl && {
				images: [
					{
						url: coverImageUrl,
						width: 264,
						height: 352,
						alt: `${game.name} cover art`,
					},
				],
			}),
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			...(coverImageUrl && {
				images: [coverImageUrl],
			}),
		},
		other: {
			'game:rating': rating,
			'game:release_date': releaseDate,
			'game:genre': genres,
			'game:platform': platforms,
			...(developer && { 'game:developer': developer }),
		},
	}
}

export default async function GamePage({ params }: GamePageProps) {
	const { slug } = await params
	const game = await getGameBySlug(slug)

	if (!game) return <p>Game not found</p>

	const developer = game.involved_companies.find((company) => company.developer)?.company.name

	return (
		<div className='space-y-6'>
			<div className='flex gap-4 items-start'>
				<GameImage className='max-w-1/3 min-w-[110px]' imageId={game.cover.image_id} imageSize='cover_big' alt={game.name} priority />
				<div className='flex flex-col gap-6'>
					<div className='flex flex-col gap-2'>
						<Title className='sm:text-[24px]'>{game.name}</Title>
						{developer && <span className='text-sm text-[#775C90] leading-5'>{developer}</span>}
					</div>
					<CollectGameButton game={game} className='hidden sm:block w-[125px]' />
				</div>
			</div>
			<div>
				<CollectGameButton game={game} className='block sm:hidden w-full' />
			</div>
			<div className='flex gap-2 flex-wrap'>
				<Badge icon={<StarIcon />} title='Rating' value={formatIGDBRating(game.rating)} />
				<Badge icon={<CalendarIcon />} title='Release Date' value={formatIGDBTimestamp(game.first_release_date)} />
				<Badge icon={<PuzzlePieceIcon />} title='Genre' value={game.genres.map((genre) => genre.name).join(', ')} />
			</div>
			<div className='flex flex-col gap-2'>
				<span className='text-[16px] font-semibold leading-5'>Summary</span>
				<p className='text-[16px] font-medium leading-5 text-[#666666]'>{game.summary}</p>
			</div>
			<div className='flex flex-col gap-2'>
				<span className='text-[16px] font-semibold leading-5'>Platforms</span>
				<p className='text-[16px] font-medium leading-5 text-[#666666]'>{game.platforms.map((platform) => platform.name).join(', ')}</p>
			</div>

			<div className='flex flex-col gap-2'>
				<span className='text-[16px] font-semibold leading-5'>Screenshots</span>
				{game.screenshots ? (
					<ScreenshotCarousel screenshots={game.screenshots} name={game.name} />
				) : (
					<p className='text-sm font-medium leading-5 text-[#666666]'>No screenshots available</p>
				)}
			</div>

			<div className='flex flex-col gap-2'>
				<span className='text-[16px] font-semibold leading-5'>Similar Games</span>
				<SimilarGames games={game.similar_games} />
			</div>
		</div>
	)
}
