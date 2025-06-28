interface ArrowBackProps {
	size?: number
}

export default function ArrowBack({ size = 14 }: ArrowBackProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M6.99996 12.8333L1.16663 6.99996L6.99996 1.16663'
				stroke='#3C1661'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path d='M12.8333 7H1.16663' stroke='#3C1661' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	)
}
