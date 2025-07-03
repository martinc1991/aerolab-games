'use client'

import { HighlightMatchingText } from '@/components/search-input/highlight-matching-text'
import { CloseIcon } from '@/components/svg/close-icon'
import { SearchIcon } from '@/components/svg/search-icon'
import { Input } from '@/components/ui/input'
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
							{showingDefault ? 'Loading suggestions...' : 'Searching games...'}
						</div>
					) : hasError ? (
						<div className='px-4 py-4 text-sm text-red-500 text-center'>Search failed. Please try again.</div>
					) : suggestions.length > 0 ? (
						<div className='p-2 space-y-1'>
							{suggestions.map((game, index) => {
								const isSelected = index === selectedIndex
								return (
									<Link key={game.id} href={`/game/${game.slug}`} onClick={() => handleSuggestionClick(index)} prefetch>
										<div
											className={`w-full h-[50px] flex gap-3 items-center p-3 transition-all duration-150 text-left cursor-pointer ${
												isSelected ? 'bg-pink-50 rounded-lg' : 'hover:bg-gray-50 rounded-lg'
											}`}
										>
											{game.cover?.image_id ? (
												<Image
													src={getIGDBImageUrl(game.cover.image_id, 'micro', false)}
													width={32}
													height={32}
													alt={`${game.name} cover`}
													className='rounded-md object-cover flex-shrink-0'
												/>
											) : (
												<div className='w-[32px] h-[32px] bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center'>
													<span className='text-xs text-gray-400'>?</span>
												</div>
											)}
											<span className={`text-sm font-medium flex-1 leading-5 ${isSelected ? 'text-pink-700' : 'text-gray-900'}`}>
												<HighlightMatchingText text={game.name} searchTerm={inputValue} skipHighlighting={showingDefault} />
											</span>
										</div>
									</Link>
								)
							})}
						</div>
					) : inputValue.trim().length >= 2 ? (
						<div className='px-4 py-4 text-sm text-gray-500 text-center'>No games found</div>
					) : null}
				</div>
			)}
		</div>
	)
}
