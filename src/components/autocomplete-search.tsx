'use client'

import { CloseIcon } from '@/components/svg/close-icon'
import { SearchIcon } from '@/components/svg/search-icon'
import { Input } from '@/components/ui/input'
import { searchGameSuggestions } from '@/lib/actions/game-actions'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { useCollectedGames } from '@/providers/collected-games'
import { getIGDBImageUrl } from '@/services/igdb/imageService'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface AutocompleteSearchProps {
	placeholder: string
}

export function AutocompleteSearch({ placeholder }: AutocompleteSearchProps) {
	const [inputValue, setInputValue] = useState('')
	const [suggestions, setSuggestions] = useState<IGDBGameSearchSuggestion[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showingPopular, setShowingPopular] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const { popularGames, isLoadingPopular } = useCollectedGames()

	// Function to highlight matching text
	// TODO: extract to a separate component
	const highlightMatchingText = (text: string, searchTerm: string) => {
		if (!searchTerm.trim() || showingPopular) {
			return <span>{text}</span>
		}

		const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
		const parts = text.split(regex)

		return (
			<span>
				{parts.map((part, index) => {
					const isMatch = regex.test(part)
					regex.lastIndex = 0 // Reset regex for next iteration
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

	// Fetch suggestions when input changes
	useEffect(() => {
		const fetchSuggestions = async () => {
			if (inputValue.trim().length === 0) {
				// Show prefetched popular games when input is empty
				if (isOpen) {
					setSuggestions(popularGames) // FIXME: types
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
	}, [inputValue, popularGames, isLoadingPopular])

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		setIsOpen(true)
	}

	// Handle input focus
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

	// Handle input blur
	const handleBlur = () => {
		// Delay hiding to allow for clicks on suggestions
		setTimeout(() => {
			if (!dropdownRef.current?.contains(document.activeElement)) {
				setIsOpen(false)
			}
		}, 150)
	}

	// Handle clear button click
	const handleClear = () => {
		setInputValue('')
		setSuggestions([])
		setShowingPopular(false)
		setIsOpen(false)
		inputRef.current?.focus()
	}

	// Handle suggestion click
	const handleSuggestionClick = (game: IGDBGameSearchSuggestion) => {
		// TODO: move outside the component
		setInputValue(game.name)
		setIsOpen(false)
		inputRef.current?.blur()
		setInputValue('')
	}

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsOpen(false)
			inputRef.current?.blur()
		}
	}

	// Determine if we should show the dropdown
	const shouldShowDropdown =
		isOpen &&
		(inputValue.trim().length === 0 || // Show popular games when empty
			inputValue.trim().length >= 2) // Show search results when typing

	return (
		<div className='relative w-full sm:max-w-[358px] place-self-center'>
			<div className='relative'>
				<div className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10'>
					<SearchIcon size={16} color={isOpen ? 'var(--main)' : '#E7C0DB'} />
				</div>

				{inputValue && (
					<button
						onClick={handleClear}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 z-10 w-4 h-4 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer'
						type='button'
					>
						<CloseIcon size={16} />
					</button>
				)}

				<Input
					ref={inputRef}
					placeholder={placeholder}
					value={inputValue}
					onChange={handleInputChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					className={`w-full bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-pink-300 selection:bg-pink-200 selection:text-pink-800 pl-10 text-sm ${
						inputValue ? 'pr-10' : 'pr-3'
					} overflow-hidden text-ellipsis whitespace-nowrap ${
						shouldShowDropdown ? 'rounded-t-xl rounded-b-none border-pink-300' : 'rounded-full border-pink-300'
					}`}
				/>
			</div>

			{shouldShowDropdown && (
				<div
					ref={dropdownRef}
					className='absolute top-full left-0 right-0 -mt-px bg-white border border-pink-300 rounded-b-xl shadow-lg z-50'
				>
					{isLoading ? (
						<div className='px-4 py-4 text-sm text-gray-500 text-center'>
							{showingPopular ? 'Loading popular games...' : 'Searching games...'}
						</div>
					) : suggestions.length > 0 ? (
						<div className='p-2'>
							{suggestions.map((game) => (
								<Link key={game.id} href={`/game/${game.slug}`} onClick={() => handleSuggestionClick(game)} prefetch>
									<button
										className={`w-full h-[42px] flex gap-2 items-center p-2 hover:bg-gray-50 transition-colors text-left cursor-pointer`}
									>
										{game.cover?.image_id ? (
											<Image
												src={getIGDBImageUrl(game.cover.image_id, 'micro')}
												width={30}
												height={30}
												alt={`${game.name} cover`}
												className='rounded-md object-cover flex-shrink-0'
											/>
										) : (
											<div className='w-10 h-10 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center'>
												<span className='text-xs text-gray-400'>?</span>
											</div>
										)}
										<span className='text-sm font-medium text-gray-900 truncate flex-1'>
											{highlightMatchingText(game.name, inputValue)}
										</span>
									</button>
								</Link>
							))}
						</div>
					) : inputValue.trim().length >= 2 ? (
						<div className='px-4 py-4 text-sm text-gray-500 text-center'>No games found</div>
					) : null}
				</div>
			)}
		</div>
	)
}
