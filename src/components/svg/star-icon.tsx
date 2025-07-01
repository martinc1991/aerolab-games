interface StarIconProps {
	size?: number
	color?: string
}

export function StarIcon({ size = 14, color = '#6727A6' }: StarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M8.00004 1.33337L10.06 5.50671L14.6667 6.18004L11.3334 9.42671L12.12 14.0134L8.00004 11.8467L3.88004 14.0134L4.66671 9.42671L1.33337 6.18004L5.94004 5.50671L8.00004 1.33337Z'
				stroke={color}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
