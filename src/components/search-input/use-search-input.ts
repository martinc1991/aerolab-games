import { searchGameSuggestions } from '@/lib/actions/game-actions'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { useCollectedGames } from '@/providers/collected-games'
import { useEffect, useRef, useState } from 'react'

export function useSearchInput() {
	const [inputValue, setInputValue] = useState('')
	const [suggestions, setSuggestions] = useState<IGDBGameSearchSuggestion[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showingPopular, setShowingPopular] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const { popularGames, isLoadingPopular } = useCollectedGames()

	// Fetch suggestions when input changes
	useEffect(() => {
		const fetchSuggestions = async () => {
			if (inputValue.trim().length === 0) {
				// Show prefetched popular games when input is empty
				if (isOpen) {
					setSuggestions(popularGames)
					setShowingPopular(true)
					setIsLoading(isLoadingPopular)
				}
				return
			}

			if (inputValue.trim().length < 2) {
				setSuggestions([])
				setShowingPopular(false)
				return
			}

			setIsLoading(true)
			setShowingPopular(false)
			try {
				const results = await searchGameSuggestions(inputValue)
				setSuggestions(results)
			} catch (error) {
				console.error('Failed to fetch suggestions:', error)
				setSuggestions([])
			} finally {
				setIsLoading(false)
			}
		}

		const timeoutId = setTimeout(fetchSuggestions, 300) // Debounce
		return () => clearTimeout(timeoutId)
	}, [inputValue, popularGames, isLoadingPopular, isOpen])

	// Event handlers
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		setIsOpen(true)
	}

	const handleFocus = async () => {
		setIsOpen(true)

		// If input is empty, immediately show popular games
		if (inputValue.trim().length === 0) {
			setSuggestions(popularGames)
			setShowingPopular(true)
			setIsLoading(isLoadingPopular)
		}
		// If there's text, always ensure we have suggestions
		else if (inputValue.trim().length >= 2) {
			setShowingPopular(false)
			if (suggestions.length === 0 && !isLoading) {
				setIsLoading(true)
				try {
					const results = await searchGameSuggestions(inputValue)
					setSuggestions(results)
				} catch (error) {
					console.error('Failed to fetch suggestions on focus:', error)
					setSuggestions([])
				} finally {
					setIsLoading(false)
				}
			}
		}
	}

	const handleBlur = () => {
		setTimeout(() => {
			if (!dropdownRef.current?.contains(document.activeElement)) {
				setIsOpen(false)
			}
		}, 150)
	}

	const handleClear = () => {
		setInputValue('')
		setSuggestions([])
		setShowingPopular(false)
		setIsOpen(false)
		inputRef.current?.focus()
	}

	const handleSuggestionClick = (game: IGDBGameSearchSuggestion) => {
		setInputValue(game.name)
		setIsOpen(false)
		inputRef.current?.blur()
		setInputValue('')
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsOpen(false)
			inputRef.current?.blur()
		}
	}

	// Derived state
	const shouldShowDropdown =
		isOpen &&
		(inputValue.trim().length === 0 || // Show popular games when empty
			inputValue.trim().length >= 2) // Show search results when typing

	return {
		// State
		inputValue,
		suggestions,
		isOpen,
		isLoading,
		showingPopular,
		shouldShowDropdown,

		// Refs
		inputRef,
		dropdownRef,

		// Handlers
		handleInputChange,
		handleFocus,
		handleBlur,
		handleClear,
		handleSuggestionClick,
		handleKeyDown,
	}
}
