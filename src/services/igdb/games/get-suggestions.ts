import { igdbQuery } from '@/lib/igdb/api'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'

/**
 * Get search suggestions based on partial input
 * @param partialName - Partial game name
 * @param limit - Maximum number of suggestions (default: 10)
 * @returns Promise<IGDBGame[]>
 */
export async function getSearchSuggestions(partialName: string, limit: number = 10): Promise<IGDBGameSearchSuggestion[]> {
	if (!partialName.trim() || partialName.length < 2) {
		return []
	}

	const query = `fields name, cover.image_id, slug;
limit ${limit};
where name ~ *"${partialName}"* & version_parent = null;
sort rating desc;`

	return igdbQuery<IGDBGameSearchSuggestion[]>(query)
}

/**
 * Get popular games based on rating
 * @param limit - Maximum number of results (default: 10)
 * @returns Promise<IGDBGame[]>
 */
export async function getPopularGamesSuggestions(limit: number = 10): Promise<IGDBGameSearchSuggestion[]> {
	const query = `fields id, name, slug, cover.image_id;
limit ${limit};
sort total_rating desc;
where total_rating_count > 50 & total_rating != null;`

	return igdbQuery<IGDBGameSearchSuggestion[]>(query)
}
