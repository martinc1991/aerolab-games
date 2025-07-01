'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { useCollectedGames } from '@/providers/collected-games'
import { useMemo } from 'react'

export function SavedGamesFilters() {
	const { sortBy: timeRange, setSortBy: setTimeRange, games } = useCollectedGames()

	const areThereGames = useMemo(() => games.length > 0, [games])

	return (
		<div className={cn('flex flex-col gap-4 w-full', !areThereGames && 'invisible')}>
			<ToggleGroup
				type='single'
				value={timeRange}
				onValueChange={setTimeRange}
				variant='outline'
				className='*:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex'
			>
				<ToggleGroupItem value='last-added'>Last added</ToggleGroupItem>
				<ToggleGroupItem value='newest'>Newest</ToggleGroupItem>
				<ToggleGroupItem value='oldest'>Oldest</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
