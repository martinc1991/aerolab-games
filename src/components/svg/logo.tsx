type Props = {
	size?: number
}

export function Logo({ size = 24 }: Props) {
	return (
		<svg width={size} height={size} viewBox='16 16 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g>
				<rect x='16' y='16' width='24' height='24' rx='8' fill='url(#paint0_linear_16996_4262)' />
				<rect x='16.5' y='16.5' width='23' height='23' rx='7.5' stroke='url(#paint1_linear_16996_4262)' />
			</g>
			<path d='M29.25 30.75L23.5 25V23.5H25L30.75 29.25' stroke='#3C1661' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M28.5 31.5L31.5 28.5' stroke='#3C1661' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M30 30L32 32' stroke='#3C1661' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M31.5 32.5L32.5 31.5' stroke='#3C1661' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M29.25 25.25L31 23.5H32.5V25L30.75 26.75' stroke='#3C1661' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M24.5 29L26.5 31' stroke='#3C1661' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M25.5 30.5L24 32' stroke='#3C1661' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M23.5 31.5L24.5 32.5' stroke='#3C1661' strokeLinecap='round' strokeLinejoin='round' />
			<defs>
				<linearGradient id='paint0_linear_16996_4262' x1='30.7' y1='21.1' x2='30.7' y2='59.5' gradientUnits='userSpaceOnUse'>
					<stop stopColor='white' />
					<stop offset='1' stopColor='#FFB4F0' stopOpacity='0.1' />
				</linearGradient>
				<linearGradient id='paint1_linear_16996_4262' x1='16.6' y1='39.1' x2='38.8' y2='16.9' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#FF00AE' />
					<stop offset='1' stopColor='#FF97DE' />
				</linearGradient>
			</defs>
		</svg>
	)
}
