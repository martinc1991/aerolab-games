import { Carousel } from '@/components/carousel'
import { GameImage } from '@/components/game-image'
import { useMemo } from 'react'

interface ScreenshotCarouselProps {
	screenshots: { id: number; image_id: string }[]
	name: string
}

export function ScreenshotCarousel(props: ScreenshotCarouselProps) {
	const slides = useMemo(
		() =>
			props.screenshots.map((screenshot) => (
				<GameImage
					key={screenshot.id}
					imageId={screenshot.image_id}
					imageSize='thumb'
					alt={`${props.name} screenshot ${screenshot.id}`}
					className='rounded-xl'
				/>
			)),
		[props.screenshots, props.name]
	)

	return <Carousel slides={slides} options={{ align: 'start', dragFree: true, loop: true }} />
}
