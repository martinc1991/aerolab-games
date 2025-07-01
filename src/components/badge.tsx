import React from 'react'

interface BadgeProps {
	icon: React.ReactNode
	title: string
	value: string | number
}

export function Badge(props: BadgeProps) {
	return (
		<div className='rounded-full bg-white py-2 px-3 border border-[#E2DCE7] h-9 flex items-center gap-1 w-fit'>
			{props.icon}
			<div className='flex gap-1'>
				<span className='text-sm text-[#6727A6] leading-5'>{props.title}:</span>
				<span className='text-[16px] text-black leading-5'>{props.value}</span>
			</div>
		</div>
	)
}
