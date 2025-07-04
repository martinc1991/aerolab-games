'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { useCollectedGames } from '@/providers/collected-games'
import { SortBy } from '@/types'
import { useIntersectionObserver } from 'usehooks-ts'

export function SavedGamesFilters() {
	const { games, collectedGamesLoaded } = useCollectedGames()
	const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5, initialIsIntersecting: true })

	if (games.length === 0 || !collectedGamesLoaded) return null

	return (
		<div className={cn('flex flex-col')}>
			<div ref={ref} className='h-0' />
			<div
				className={cn(
					'transition-all duration-200',
					isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
				)}
			>
				<Filters isIntersecting={isIntersecting} />
			</div>
			<div
				className={cn(
					'fixed top-0 left-0 w-full z-50 flex justify-center pt-4 pb-2 transition-all duration-200',
					isIntersecting ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
				)}
			>
				<Filters isIntersecting={isIntersecting} />
			</div>
		</div>
	)
}

interface FiltersProps {
	isIntersecting: boolean
}

function Filters({ isIntersecting }: FiltersProps) {
	const { sortBy: timeRange, setSortBy: setTimeRange } = useCollectedGames()

	return (
		<ToggleGroup
			type='single'
			value={timeRange}
			onValueChange={(value: SortBy) => {
				if (value) {
					window.scrollTo({ top: 0, behavior: 'smooth' })
					setTimeRange(value)
				}
			}}
			defaultValue={SortBy.LAST_ADDED}
			className={cn('*:data-[slot=toggle-group-item]:!m-1 rounded-full', !isIntersecting ? '!bg-white/90' : '!bg-transparent')}
		>
			<FilterButton value={SortBy.LAST_ADDED}>Last added</FilterButton>
			<FilterButton value={SortBy.NEWEST}>Newest</FilterButton>
			<FilterButton value={SortBy.OLDEST}>Oldest</FilterButton>
		</ToggleGroup>
	)
}

interface FilterButtonProps {
	value: SortBy
	children: React.ReactNode
}

function FilterButton({ value, children }: FilterButtonProps) {
	return (
		<ToggleGroupItem
			className='!px-6 !rounded-full transition-all duration-500 linear data-[state=on]:!bg-main data-[state=on]:!text-white data-[state=off]:!bg-transparent cursor-pointer data-[state=on]:!cursor-default'
			value={value}
		>
			{children}
		</ToggleGroupItem>
	)
}
