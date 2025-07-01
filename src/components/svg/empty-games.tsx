interface EmptyGamesProps {
	size?: number
}

export function EmptyGames({ size = 358 }: EmptyGamesProps) {
	return (
		<svg width={size} height={size * (168 / 358)} viewBox='0 0 358 168' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g opacity='0.5'>
				<rect
					x='209.956'
					y='8.84708'
					width='108.5'
					height='144.5'
					rx='11.25'
					transform='rotate(8 209.956 8.84708)'
					fill='url(#paint0_linear_16996_4400)'
				/>
				<rect
					x='209.956'
					y='8.84708'
					width='108.5'
					height='144.5'
					rx='11.25'
					transform='rotate(8 209.956 8.84708)'
					stroke='#D7D7D7'
					strokeWidth='1.5'
				/>
			</g>
			<g opacity='0.5'>
				<rect
					x='-0.638321'
					y='0.847081'
					width='108.5'
					height='144.5'
					rx='11.25'
					transform='matrix(-0.990268 0.139173 0.139173 0.990268 146.541 8.09708)'
					fill='url(#paint1_linear_16996_4400)'
				/>
				<rect
					x='-0.638321'
					y='0.847081'
					width='108.5'
					height='144.5'
					rx='11.25'
					transform='matrix(-0.990268 0.139173 0.139173 0.990268 146.541 8.09708)'
					stroke='#D7D7D7'
					strokeWidth='1.5'
				/>
			</g>
			<rect x='116.75' y='0.75' width='124.5' height='166.5' rx='11.25' fill='url(#paint2_linear_16996_4400)' />
			<rect x='116.75' y='0.75' width='124.5' height='166.5' rx='11.25' stroke='#D7D7D7' strokeWidth='1.5' />
			<path
				d='M179 96.3333C186.364 96.3333 192.333 90.3638 192.333 83C192.333 75.6362 186.364 69.6666 179 69.6666C171.636 69.6666 165.666 75.6362 165.666 83C165.666 90.3638 171.636 96.3333 179 96.3333Z'
				stroke='#D7D7D7'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M184.333 88.3333C184.333 88.3333 182.333 85.6666 179 85.6666C175.666 85.6666 173.666 88.3333 173.666 88.3333'
				stroke='#D7D7D7'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path d='M175 79H175.013' stroke='#D7D7D7' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M183 79H183.013' stroke='#D7D7D7' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
			<defs>
				<linearGradient id='paint0_linear_16996_4400' x1='264.318' y1='8' x2='264.318' y2='154' gradientUnits='userSpaceOnUse'>
					<stop stopColor='white' />
					<stop offset='1' stopColor='#E6E6E6' />
				</linearGradient>
				<linearGradient id='paint1_linear_16996_4400' x1='55' y1='0' x2='55' y2='146' gradientUnits='userSpaceOnUse'>
					<stop stopColor='white' />
					<stop offset='1' stopColor='#E6E6E6' />
				</linearGradient>
				<linearGradient id='paint2_linear_16996_4400' x1='179' y1='0' x2='179' y2='168' gradientUnits='userSpaceOnUse'>
					<stop stopColor='white' />
					<stop offset='1' stopColor='#E6E6E6' />
				</linearGradient>
			</defs>
		</svg>
	)
}
