interface Props {
	size?: number
}

export function TrashCan({ size = 40 }: Props) {
	return (
		<svg width={size} height={size} viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect width={size} height={size} rx='20' fill='white' fillOpacity='0.85' />
			<path d='M14 16H26' stroke='black' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
			<path
				d='M24.6666 16V25.3333C24.6666 26 24 26.6667 23.3333 26.6667H16.6666C16 26.6667 15.3333 26 15.3333 25.3333V16'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M17.3333 16V14.6667C17.3333 14 18 13.3334 18.6666 13.3334H21.3333C22 13.3334 22.6666 14 22.6666 14.6667V16'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
