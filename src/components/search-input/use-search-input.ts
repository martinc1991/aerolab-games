import { searchGameSuggestions } from '@/lib/actions/game-actions'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { useCollectedGames } from '@/providers/collected-games'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

const CONFIG = {
	DEBOUNCE_DELAY: 300,
	MIN_SEARCH_LENGTH: 2,
	BLUR_DELAY: 150,
} as const

type SearchState = 'idle' | 'loading' | 'error' | 'success'

export function useSearchInput() {
	const [inputValue, setInputValue] = useState('')
	const [suggestions, setSuggestions] = useState<IGDBGameSearchSuggestion[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [searchState, setSearchState] = useState<SearchState>('idle')
	const [showingDefault, setShowingDefault] = useState(false)

	const inputRef = useRef<HTMLInputElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const { popularGames: defaultSuggestions, isLoadingPopular } = useCollectedGames()

	const isLoading = searchState === 'loading' || (showingDefault && isLoadingPopular)
	const hasError = searchState === 'error'
	const isEmptySearch = inputValue.trim().length === 0
	const isValidSearch = inputValue.trim().length >= CONFIG.MIN_SEARCH_LENGTH
	const shouldShowDropdown = isOpen && (isEmptySearch || isValidSearch)

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
				const results = await searchGameSuggestions(trimmedTerm)
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
		inputRef.current?.blur()
	}, [debouncedSearch])

	useEffect(() => {
		debouncedSearch(inputValue)
	}, [inputValue, debouncedSearch])

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		setIsOpen(true)
	}, [])

	const handleInputFocus = useCallback(async () => {
		setIsOpen(true)

		if (isValidSearch && suggestions.length === 0 && !isLoading) {
			debouncedSearch.cancel()
			await performSearch(inputValue)
		}
	}, [isValidSearch, suggestions.length, isLoading, debouncedSearch, performSearch, inputValue])

	const handleInputBlur = useCallback(() => {
		setTimeout(() => {
			const isClickingOutside = !dropdownRef.current?.contains(document.activeElement)
			if (isClickingOutside) {
				setIsOpen(false)
			}
		}, CONFIG.BLUR_DELAY)
	}, [])

	const handleClearClick = useCallback(() => {
		resetSearch()
	}, [resetSearch])

	const handleSuggestionClick = useCallback(() => {
		closeDropdown()
		setInputValue('')
	}, [closeDropdown])

	const handleEscapeKey = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeDropdown()
			}
		},
		[closeDropdown]
	)

	return {
		inputValue,
		suggestions,
		isOpen,
		isLoading,
		hasError,
		showingDefault,
		shouldShowDropdown,
		inputRef,
		dropdownRef,
		handleInputChange,
		handleInputFocus,
		handleInputBlur,
		handleClearClick,
		handleSuggestionClick,
		handleEscapeKey,
	}
}
