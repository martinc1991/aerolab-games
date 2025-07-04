import type { SVGProps } from 'react'

export function ShareIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={20}
			height={20}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}
		>
			<circle cx={18} cy={5} r={3} />
			<circle cx={6} cy={12} r={3} />
			<circle cx={18} cy={19} r={3} />
			<path d='m8.59 13.51 6.83 3.98' />
			<path d='m15.41 6.51-6.82 3.98' />
		</svg>
	)
}
