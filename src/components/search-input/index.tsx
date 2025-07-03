'use client'

import { HighlightMatchingText } from '@/components/search-input/highlight-matching-text'
import { CloseIcon } from '@/components/svg/close-icon'
import { SearchIcon } from '@/components/svg/search-icon'
import { Input } from '@/components/ui/input'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { cn } from '@/lib/utils'
import { getIGDBImageUrl } from '@/services/igdb/imageService'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchInput } from './use-search-input'

export function SearchInput() {
	const {
		// Input state
		inputValue,
		suggestions,
		selectedIndex,
		isOpen,
		isLoading,
		hasError,
		showingDefault,
		shouldShowDropdown,

		// Refs
		inputRef,
		dropdownRef,
		clearButtonRef,

		// Event handlers
		handleInputChange,
		handleInputFocus,
		handleClearClick,
		handleSuggestionClick,
		handleKeyDown,
	} = useSearchInput()

	return (
		<div className='relative w-full sm:max-w-[358px] place-self-center'>
			<div className='relative'>
				<div className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10'>
					<SearchIcon size={16} color={isOpen ? 'var(--main)' : '#E7C0DB'} />
				</div>

				{inputValue && (
					<button
						ref={clearButtonRef}
						onClick={handleClearClick}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 z-10 w-4 h-4 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer'
						type='button'
					>
						<CloseIcon size={16} />
					</button>
				)}

				<Input
					ref={inputRef}
					placeholder='Search games...'
					value={inputValue}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onKeyDown={handleKeyDown}
					className={cn(
						'w-full bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-pink-300 selection:bg-pink-200 selection:text-pink-800 pl-10 text-sm overflow-hidden text-ellipsis whitespace-nowrap',
						inputValue ? 'pr-10' : 'pr-3',
						shouldShowDropdown ? 'rounded-t-xl rounded-b-none border-pink-300' : 'rounded-full border-pink-300'
					)}
				/>
			</div>

			{shouldShowDropdown && (
				<div
					ref={dropdownRef}
					className='absolute top-full left-0 right-0 -mt-px bg-white border border-pink-300 rounded-b-xl shadow-lg z-50'
				>
					{isLoading ? (
						<LoadingState showingDefault={showingDefault} />
					) : hasError ? (
						<ErrorState />
					) : suggestions.length > 0 ? (
						<SuggestionDropdown
							suggestions={suggestions}
							selectedIndex={selectedIndex}
							handleSuggestionClick={handleSuggestionClick}
							inputValue={inputValue}
							showingDefault={showingDefault}
						/>
					) : inputValue.trim().length >= 2 ? (
						<NoResultsState />
					) : null}
				</div>
			)}
		</div>
	)
}

interface SuggestionDropdownProps {
	suggestions: IGDBGameSearchSuggestion[]
	selectedIndex: number
	handleSuggestionClick: (index: number) => void
	inputValue: string
	showingDefault: boolean
}

/**
 * Renders a dropdown list of game suggestions for the search input.
 * Maps through the suggestions array and renders a SuggestionRow component for each game.
 */
function SuggestionDropdown(props: SuggestionDropdownProps) {
	return (
		<div className='p-1 space-y-1 max-h-[282px] overflow-y-auto'>
			{props.suggestions.map((game, index) => (
				<SuggestionRow
					key={game.id}
					game={game}
					index={index}
					isSelected={index === props.selectedIndex}
					onClick={() => props.handleSuggestionClick(index)}
					inputValue={props.inputValue}
					showingDefault={props.showingDefault}
				/>
			))}
		</div>
	)
}

interface SuggestionRowProps {
	game: IGDBGameSearchSuggestion
	index: number
	isSelected: boolean
	onClick: () => void
	inputValue: string
	showingDefault: boolean
}

/**
 * Renders a single game suggestion row in the search dropdown.
 * Displays the game's cover image (or placeholder if none exists) and name.
 * Highlights matching text in the game name when searching.
 * Links to the game's detail page on click.
 * Handles selected state styling with pink background.
 */
function SuggestionRow(props: SuggestionRowProps) {
	return (
		<Link key={props.game.id} href={`/game/${props.game.slug}`} onClick={props.onClick} prefetch>
			<div
				data-suggestion-index={props.index}
				className={cn(
					'w-full h-[50px] flex gap-3 items-center p-2 transition-all duration-150 text-left cursor-pointer rounded-lg',
					props.isSelected ? 'bg-pink-100' : 'hover:bg-pink-50'
				)}
			>
				{props.game.cover?.image_id ? (
					<Image
						src={getIGDBImageUrl(props.game.cover.image_id, 'micro', false)}
						width={32}
						height={32}
						alt={`${props.game.name} cover`}
						className='rounded-md object-cover flex-shrink-0'
					/>
				) : (
					<div className='w-[32px] h-[32px] bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center'>
						<span className='text-xs text-gray-400'>?</span>
					</div>
				)}
				<span className={cn('text-sm font-medium flex-1 leading-5', props.isSelected ? 'text-pink-700' : 'text-gray-900')}>
					<HighlightMatchingText text={props.game.name} searchTerm={props.inputValue} skipHighlighting={props.showingDefault} />
				</span>
			</div>
		</Link>
	)
}

function LoadingState({ showingDefault }: { showingDefault: boolean }) {
	return (
		<div className='px-4 py-4 text-sm text-gray-500 text-center'>{showingDefault ? 'Loading suggestions...' : 'Searching games...'}</div>
	)
}

function ErrorState() {
	return <div className='px-4 py-4 text-sm text-red-500 text-center'>Search failed. Please try again.</div>
}
function NoResultsState() {
	return <div className='px-4 py-4 text-sm text-gray-500 text-center'>No games found</div>
}
