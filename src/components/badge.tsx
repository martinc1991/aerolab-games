import { Typography } from '@/components/typography'
import React from 'react'

interface BadgeProps {
	icon: React.ReactNode
	title: string
	value: string | number
}

export function Badge(props: BadgeProps) {
	return (
		<div className='rounded-full bg-white py-2 px-3 border border-main h-9 flex items-center gap-1 max-w-full'>
			{props.icon}
			<div className='flex gap-1 min-w-0 flex-1'>
				<Typography.Highlighted className='text-sm font-semibold whitespace-nowrap'>{props.title}:</Typography.Highlighted>
				<Typography.Muted className='truncate text-sm'>{props.value}</Typography.Muted>
			</div>
		</div>
	)
}
