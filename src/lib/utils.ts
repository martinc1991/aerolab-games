import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Formats an IGDB rating from a 0-100 scale to a 0-10 scale with one decimal place
 * @param rating - The rating value from IGDB (0-100)
 * @returns The formatted rating as a string with one decimal place (0.0-10.0)
 */
export function formatIGDBRating(rating: number) {
	return (rating / 10).toFixed(1)
}

/**
 * Formats a Unix timestamp into a localized date string
 * @param date - Unix timestamp in seconds
 * @returns Formatted date string in MM/DD/YYYY format
 */
export function formatIGDBTimestamp(timestamp: number) {
	const date = new Date(timestamp * 1000)
	const month = String(date.getMonth() + 1)
	const day = String(date.getDate())
	const year = date.getFullYear()

	return `${month}/${day}/${year}`
}

/**
 * Get a random element from an array
 * @param array - The array to get a random element from
 * @returns A random element from the array
 */
export function getRandomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)]
}

/**
 * Normalize a token to only a–z and 0–9
 * 1. Decompose & strip accents
 * 2. Remove any char that isn’t [A-Za-z0-9]
 * 3. Lowercase the result
 */
export function sanitizeToken(s: string): string {
	return s
		.normalize('NFD') // NFD: decompose accents (e.g. é → e +  ́ )
		.replace(/[\u0300-\u036f]/g, '') // strip combining marks
		.replace(/[^A-Za-z0-9]/g, '') // remove everything except letters & digits
		.toLowerCase()
}
