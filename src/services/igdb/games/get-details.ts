import { igdbQuery } from '@/lib/igdb/api'
import { IGDBGameDetails } from '@/lib/igdb/types'

/**
 * Get game information by slug
 * @param slug - The game slug
 * @returns Promise<IGDBGameDetails | null>
 */
export async function getGameBySlug(slug: string): Promise<IGDBGameDetails | null> {
	const query = `fields name, cover.image_id, summary, slug, first_release_date, rating, genres.name, platforms.name, screenshots.image_id, similar_games.name, similar_games.cover.image_id, similar_games.slug, involved_companies.company.name, involved_companies.developer, involved_companies.publisher;
where slug = "${slug}";`

	const results = await igdbQuery<IGDBGameDetails[]>(query)
	return results.length > 0 ? results[0] : null
}
