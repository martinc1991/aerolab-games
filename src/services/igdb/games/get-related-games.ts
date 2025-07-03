import { igdbQuery } from '@/lib/igdb/api'

interface RelatedGames {
	id: number
	similar_games: number[]
}

/**
 * Get related games based on provided game id
 * @param gameId - The id of the game to get related games for
 * @param limit - Maximum number of results (default: 10)
 * @returns Promise<IGDBGameSearchSuggestion[]>
 */
export async function getRelatedGames(gameId: number): Promise<RelatedGames> {
	const similarGamesQuery = `
  fields similar_games;
  where id = ${gameId};
  `

	const result = await igdbQuery<RelatedGames[]>(similarGamesQuery)

	return result[0]
}
