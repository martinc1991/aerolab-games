import { searchGameSuggestions } from '@/lib/actions/game-actions'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { useCollectedGames } from '@/providers/collected-games'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

const CONFIG = {
	DEBOUNCE_DELAY: 300,
	MIN_SEARCH_LENGTH: 2,
	BLUR_DELAY: 150,
	MAX_SUGGESTIONS: 10,
} as const

type SearchState = 'idle' | 'loading' | 'error' | 'success'

export function useSearchInput() {
	const [inputValue, setInputValue] = useState('')
	const [suggestions, setSuggestions] = useState<IGDBGameSearchSuggestion[]>([])
	const [selectedIndex, setSelectedIndex] = useState(-1) // -1 means no selection
	const [isOpen, setIsOpen] = useState(false)
	const [searchState, setSearchState] = useState<SearchState>('idle')
	const [showingDefault, setShowingDefault] = useState(false)

	const inputRef = useRef<HTMLInputElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const clearButtonRef = useRef<HTMLButtonElement>(null)

	const { defaultSuggestions, isLoadingDefaultSuggestions } = useCollectedGames()

	const isLoading = searchState === 'loading' || (showingDefault && isLoadingDefaultSuggestions)
	const hasError = searchState === 'error'
	const isEmptySearch = inputValue.trim().length === 0
	const isValidSearch = inputValue.trim().length >= CONFIG.MIN_SEARCH_LENGTH
	const shouldShowDropdown = isOpen && (isEmptySearch || isValidSearch)

	// Handler to prevent external navigation
	const handleClickOutside = useCallback((event: MouseEvent) => {
		const target = event.target as Node

		// Check if the click is on the clear button (X button) and don't interfere with it
		const isClearButton = clearButtonRef.current && clearButtonRef.current.contains(target)
		if (isClearButton) return

		const isOutsideInput = inputRef.current && !inputRef.current.contains(target)
		const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target)

		if (isOutsideInput && isOutsideDropdown) {
			event.preventDefault()
			event.stopPropagation()
			event.stopImmediatePropagation()

			setIsOpen(false)
		}
	}, [])

	useEffect(() => {
		if (!isOpen) return

		document.addEventListener('click', handleClickOutside, { capture: true })

		return () => {
			document.removeEventListener('click', handleClickOutside, { capture: true })
		}
	}, [isOpen, handleClickOutside])

	useEffect(() => {
		setSelectedIndex(-1)
	}, [suggestions, isOpen])

	// Auto-scroll selected item into view when navigating with keyboard
	useEffect(() => {
		if (selectedIndex >= 0 && dropdownRef.current) {
			const selectedElement = dropdownRef.current.querySelector(`[data-suggestion-index="${selectedIndex}"]`)
			if (selectedElement) {
				selectedElement.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				})
			}
		}
	}, [selectedIndex])

	useEffect(() => {
		if (isEmptySearch && isOpen && defaultSuggestions.length > 0) {
			if (!showingDefault || suggestions !== defaultSuggestions) {
				setSuggestions(defaultSuggestions)
				setShowingDefault(true)
				setSearchState('success')
			}
		}
	}, [isEmptySearch, isOpen, defaultSuggestions, showingDefault, suggestions])

	const clearSuggestions = useCallback(() => {
		setSuggestions([])
		setShowingDefault(false)
		setSearchState('idle')
		setSelectedIndex(-1)
	}, [])

	const performSearch = useCallback(
		async (searchTerm: string) => {
			const trimmedTerm = searchTerm.trim()

			if (trimmedTerm.length === 0) {
				return
			}

			if (trimmedTerm.length < CONFIG.MIN_SEARCH_LENGTH) {
				clearSuggestions()
				return
			}

			setSearchState('loading')
			setShowingDefault(false)

			try {
				const results = await searchGameSuggestions(trimmedTerm, CONFIG.MAX_SUGGESTIONS)
				setSuggestions(results)
				setSearchState('success')
			} catch (error) {
				console.error('Search failed:', error)
				setSuggestions([])
				setSearchState('error')
			}
		},
		[clearSuggestions]
	)

	const debouncedSearch = useDebounceCallback(performSearch, CONFIG.DEBOUNCE_DELAY)

	useEffect(() => {
		debouncedSearch(inputValue)
	}, [inputValue, debouncedSearch])

	const resetSearch = useCallback(() => {
		debouncedSearch.cancel()
		setInputValue('')
		clearSuggestions()
		setIsOpen(false)
		inputRef.current?.focus()
	}, [debouncedSearch, clearSuggestions])

	const closeDropdown = useCallback(() => {
		debouncedSearch.cancel()
		setIsOpen(false)
		setSelectedIndex(-1)
		inputRef.current?.blur()
	}, [debouncedSearch])

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setInputValue(newValue)
		setSelectedIndex(-1) // Reset selection when typing
		setIsOpen(true)
	}, [])

	const handleInputFocus = useCallback(async () => {
		setIsOpen(true)

		if (isValidSearch && suggestions.length === 0 && !isLoading) {
			debouncedSearch.cancel()
			await performSearch(inputValue)
		}
	}, [isValidSearch, suggestions.length, isLoading, debouncedSearch, performSearch, inputValue])

	const handleClearClick = useCallback(() => {
		resetSearch()
	}, [resetSearch])

	const handleSuggestionClick = useCallback(
		(index: number) => {
			const selectedGame = suggestions[index]
			if (selectedGame) {
				closeDropdown()
				setInputValue('')
			}
		},
		[suggestions, closeDropdown]
	)

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (!isOpen || suggestions.length === 0) {
				if (e.key === 'Escape') {
					closeDropdown()
				}
				return
			}

			switch (e.key) {
				case 'ArrowDown': {
					e.preventDefault()
					const nextIndex = selectedIndex < suggestions.length - 1 ? selectedIndex + 1 : 0
					setSelectedIndex(nextIndex)
					break
				}

				case 'ArrowUp': {
					e.preventDefault()
					const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : suggestions.length - 1
					setSelectedIndex(prevIndex)
					break
				}

				case 'Enter': {
					e.preventDefault()
					if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
						const selectedGame = suggestions[selectedIndex]
						// Navigate to the selected game
						window.location.href = `/game/${selectedGame.slug}`
					}
					break
				}

				case 'Escape': {
					e.preventDefault()
					closeDropdown()
					break
				}
			}
		},
		[isOpen, suggestions, selectedIndex, closeDropdown]
	)

	return {
		inputValue,
		suggestions,
		selectedIndex,
		isOpen,
		isLoading,
		hasError,
		showingDefault,
		shouldShowDropdown,
		inputRef,
		dropdownRef,
		clearButtonRef,
		handleInputChange,
		handleInputFocus,
		handleClearClick,
		handleSuggestionClick,
		handleKeyDown,
	}
}
