interface CheckIconProps {
	size?: number
	color?: string
}

export function CheckIcon({ size = 16, color = '#67C076' }: CheckIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_20904_456)'>
				<path
					d='M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00004 1.33337C4.31814 1.33337 1.33337 4.31814 1.33337 8.00004C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z'
					stroke={color}
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path d='M6 7.99996L7.33333 9.33329L10 6.66663' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
			</g>
			<defs>
				<clipPath id='clip0_20904_456'>
					<rect width='16' height='16' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}
