import { igdbQuery } from '@/lib/igdb/api'
import type { IGDBGame, IGDBGameDetails } from '@/lib/igdb/types'

/**
 * Get popular games based on rating
 * @param limit - Maximum number of results (default: 10)
 * @returns Promise<IGDBGame[]>
 */
export async function getPopularGames(limit: number = 10): Promise<IGDBGame[]> {
	const query = `fields name, first_release_date, cover.image_id, total_rating, total_rating_count, slug;
limit ${limit};
sort total_rating desc;
where total_rating_count > 50 & total_rating != null;`

	return igdbQuery<IGDBGame[]>(query)
}

/**
 * Get detailed information about a specific game
 * @param gameId - The IGDB game ID
 * @returns Promise<IGDBGameDetails | null>
 */
export async function getGameDetails(gameId: number): Promise<IGDBGameDetails | null> {
	const query = `fields *, cover.*, genres.*, platforms.*, screenshots.*, 
involved_companies.company.*, involved_companies.developer, involved_companies.publisher,
age_ratings.*, release_dates.*, similar_games.name, similar_games.cover.image_id, websites.*;
where id = ${gameId};`

	const results = await igdbQuery<IGDBGameDetails[]>(query)
	return results.length > 0 ? results[0] : null
}

/**
 * Get game information by ID
 * @param gameId - The IGDB game ID
 * @returns Promise<IGDBGameDetails | null>
 */
export async function getGameById(gameId: number): Promise<IGDBGameDetails | null> {
	const query = `fields *;
where id = ${gameId};`

	const results = await igdbQuery<IGDBGameDetails[]>(query)
	return results.length > 0 ? results[0] : null
}

/**
 * Get game information by ID
 * @param gameId - The IGDB game ID
 * @returns Promise<IGDBGameDetails | null>
 */
export async function getGameBySlug(slug: string): Promise<IGDBGameDetails | null> {
	const query = `fields *;
where slug = "${slug}";`

	const results = await igdbQuery<IGDBGameDetails[]>(query)
	return results.length > 0 ? results[0] : null
}

/**
 * Get search suggestions based on partial input
 * @param partialName - Partial game name
 * @param limit - Maximum number of suggestions (default: 10)
 * @returns Promise<IGDBGame[]>
 */
export async function getSearchSuggestions(partialName: string, limit: number = 10): Promise<IGDBGame[]> {
	if (!partialName.trim() || partialName.length < 2) {
		return []
	}

	const query = `fields name, cover.image_id, slug;
limit ${limit};
where name ~ *"${partialName}"* & version_parent = null;
sort rating desc;`

	return igdbQuery<IGDBGame[]>(query)
}
