import { igdbQuery } from '@/lib/igdb/api'
import { IGDBGameSearchSuggestion } from '@/lib/igdb/types'
import { sanitizeToken } from '@/lib/utils'
import { getRelatedGames } from '@/services/igdb/games/get-related-games'

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
		.map(sanitizeToken)
		.filter((word) => word.length > 0)

	const wordConditions = words.map((word) => `(name ~ *"${word}"* | slug ~ *"${word}"*)`).join(' & ')

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

/**
 * Get related games based on provided game id
 * @param gameId - The id of the game to get related games for
 * @param limit - Maximum number of results (default: 10)
 * @returns Promise<IGDBGameSearchSuggestion[]>
 */
export async function getRelatedGamesSuggestions(gameId: number, limit: number = 10): Promise<IGDBGameSearchSuggestion[]> {
	if (!gameId || gameId <= 0) return []

	const { similar_games: similarGamesIds } = await getRelatedGames(gameId)

	if (similarGamesIds.length === 0) return []

	const relatedSuggestionsQuery = `
	fields ${suggestionFields};
  limit ${limit};
	where id = (${similarGamesIds.join(',')});
	`

	return igdbQuery<IGDBGameSearchSuggestion[]>(relatedSuggestionsQuery)
}
