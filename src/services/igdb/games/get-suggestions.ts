import { igdbQuery } from '@/lib/igdb/api'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'

const suggestionFields = 'name, cover.image_id, slug'

/**
 * Get search suggestions based on partial input
 * @param input - Partial game name
 * @param limit - Maximum number of suggestions (default: 10)
 * @returns Promise<IGDBGameSearchSuggestion[]>
 */
export async function getSearchSuggestions(input: string, limit: number = 10): Promise<IGDBGameSearchSuggestion[]> {
	if (!input.trim() || input.length < 2) return []

	const words = input
		.trim()
		.split(' ')
		.filter((word) => word.length > 0)

	const wordConditions = words.map((word) => `name ~ *"${word}"*`).join(' & ')

	const query = `
  fields ${suggestionFields};
  limit ${limit};
  where ${wordConditions} & version_parent = null;
  sort rating desc;
  `

	return igdbQuery<IGDBGameSearchSuggestion[]>(query)
}

/**
 * Get popular games based on rating
 * @param limit - Maximum number of results (default: 10)
 * @returns Promise<IGDBGameSearchSuggestion[]>
 */
export async function getPopularGamesSuggestions(limit: number = 10): Promise<IGDBGameSearchSuggestion[]> {
	const query = `
  fields ${suggestionFields};
  limit ${limit};
  sort total_rating desc;
  where total_rating_count > 50 & total_rating != null;
  `

	return igdbQuery<IGDBGameSearchSuggestion[]>(query)
}
