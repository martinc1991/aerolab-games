import { IGDB_API_URL } from '@/config/constants'
import { sleep } from '@/lib/utils'

/**
 * Get IGDB API configuration
 */
function getIGDBConfig() {
	return {
		baseUrl: IGDB_API_URL,
		clientId: process.env.CLIENT_ID!,
		accessToken: process.env.ACCESS_TOKEN!,
	}
}

/**
 * Base fetch function for IGDB API calls with retry mechanism
 * @param query - The IGDB query string
 * @param retryAttempt - Current retry attempt (internal use)
 * @returns Promise<Response>
 */
async function igdbFetch(query: string, retryAttempt: number = 0): Promise<Response> {
	const { baseUrl, clientId, accessToken } = getIGDBConfig()
	const maxRetries = 3
	const baseDelay = 1000

	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Client-ID': clientId,
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'text/plain',
		},
		body: query,
	})

	if (response.status === 429 && retryAttempt < maxRetries) {
		const delay = baseDelay * Math.pow(2, retryAttempt)
		console.warn(`IGDB API rate limited (429). Retrying in ${delay}ms... (attempt ${retryAttempt + 1}/${maxRetries})`)

		await sleep(delay)
		return igdbFetch(query, retryAttempt + 1)
	}

	if (!response.ok) {
		throw new Error(`IGDB API error: ${response.status} ${response.statusText}`)
	}

	return response
}

/**
 * Execute query and return JSON response
 * @param query - The IGDB query string
 * @returns Promise<T>
 */
export async function igdbQuery<T = unknown>(query: string): Promise<T> {
	const response = await igdbFetch(query)
	return response.json()
}
