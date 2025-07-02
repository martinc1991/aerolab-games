interface HighlightMatchingTextProps {
	text: string
	searchTerm: string
	skipHighlighting?: boolean
}

export function HighlightMatchingText({ text, searchTerm, skipHighlighting = false }: HighlightMatchingTextProps) {
	if (!searchTerm.trim() || skipHighlighting) {
		return <span>{text}</span>
	}

	const words = searchTerm
		.trim()
		.split(' ')
		.filter((word) => word.length > 0)
		.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

	if (words.length === 0) {
		return <span>{text}</span>
	}

	const regex = new RegExp(`(${words.join('|')})`, 'gi')
	const parts = text.split(regex)

	return (
		<span>
			{parts.map((part, index) => {
				const isMatch = regex.test(part)
				regex.lastIndex = 0
				return isMatch ? (
					<span className='text-pink-300' key={index}>
						{part}
					</span>
				) : (
					<span key={index}>{part}</span>
				)
			})}
		</span>
	)
}
