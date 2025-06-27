import { IGDB_API_URL } from '@/config/constants'

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
 * Base fetch function for IGDB API calls
 * @param query - The IGDB query string
 * @returns Promise<Response>
 */
async function igdbFetch(query: string): Promise<Response> {
	const { baseUrl, clientId, accessToken } = getIGDBConfig()

	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Client-ID': clientId,
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'text/plain',
		},
		body: query,
	})

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
export async function igdbQuery<T = any>(query: string): Promise<T> {
	const response = await igdbFetch(query)
	return response.json()
}
