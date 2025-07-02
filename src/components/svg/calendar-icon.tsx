interface CalendarIconProps {
	size?: number
	color?: string
}

export function CalendarIcon({ size = 14, color = '#6727A6' }: CalendarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M5.33337 1.33337V4.00004' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M10.6666 1.33337V4.00004' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
			<path
				d='M12.6667 2.66663H3.33333C2.59695 2.66663 2 3.26358 2 3.99996V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0697 14 13.3333V3.99996C14 3.26358 13.403 2.66663 12.6667 2.66663Z'
				stroke={color}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path d='M2 6.66663H14' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	)
}
