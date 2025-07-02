import { Carousel } from '@/components/carousel'
import { getIGDBImageUrl } from '@/services/igdb/imageService'
import Image from 'next/image'
import { useMemo } from 'react'

interface ScreenshotCarouselProps {
	screenshots: { id: number; image_id: string }[]
	name: string
}

export function ScreenshotCarousel(props: ScreenshotCarouselProps) {
	const slides = useMemo(
		() =>
			props.screenshots.map((screenshot) => (
				<Image
					key={screenshot.id}
					src={getIGDBImageUrl(screenshot.image_id, 'thumb')}
					alt={`${props.name} screenshot ${screenshot.id}`}
					className='rounded-xl'
					height={90}
					width={90}
				/>
			)),
		[props.screenshots, props.name]
	)

	return <Carousel slides={slides} options={{ align: 'start', dragFree: true, loop: true }} />
}
