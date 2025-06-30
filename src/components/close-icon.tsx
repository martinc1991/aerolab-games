interface CloseIconProps {
	size?: number
	color?: string
}

export function CloseIcon({ size = 20, color = 'black' }: CloseIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M15 5L5 15' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M5 5L15 15' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	)
}
