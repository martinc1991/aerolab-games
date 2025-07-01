'use client'

import './embla.css'

import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback } from 'react'
import { NextButton, PrevButton } from './buttons'
import { usePrevNextButtons } from './use-prev-next-buttons'

interface CarouselProps {
	slides: React.ReactNode[]
	options?: EmblaOptionsType
}

export function Carousel(props: CarouselProps) {
	const { slides, options } = props
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay
		if (!autoplay) return

		const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop

		resetOrStop()
	}, [])

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi, onNavButtonClick)

	return (
		<section className='embla'>
			<div className='embla__viewport' ref={emblaRef}>
				<div className='embla__container'>
					{slides.map((slide, index) => (
						<div className='embla__slide' key={index}>
							<div className='embla__slide__content'>{slide}</div>
						</div>
					))}
				</div>
			</div>

			<div className='embla__controls'>
				<div className='embla__buttons'>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</section>
	)
}
