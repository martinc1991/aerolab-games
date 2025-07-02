import { IGDB_IMAGE_BASE_URL } from '@/config/constants'

export type IGDBImageSize =
	| 'cover_small' // 90x128
	| 'screenshot_med' // 569x320
	| 'cover_big' // 227x320
	| 'logo_med' // 284x160
	| 'screenshot_big' // 889x500
	| 'screenshot_huge' // 1280x720
	| 'thumb' // 90x90
	| 'micro' // 35x35
	| '720p' // 1280x720
	| '1080p' // 1920x1080

/**
 * Construct IGDB image URL from image_id and size
 * @param imageId - The image_id from IGDB API response
 * @param size - The desired image size
 * @returns Complete image URL
 */
export function getIGDBImageUrl(imageId: string, size: IGDBImageSize = '720p', retina = true): string {
	const suffix = retina ? '_2x' : ''
	return `${IGDB_IMAGE_BASE_URL}/t_${size}${suffix}/${imageId}.jpg`
}

/**
 * Extract image_id from existing IGDB image URL
 * @param url - Existing IGDB image URL
 * @returns The image_id or null if not found
 */
export function extractImageId(url: string): string | null {
	if (!url) return null

	const match = url.match(/\/([^/]+)\.jpg$/i)
	return match ? match[1] : null
}

/**
 * Convert existing IGDB image URL to different size
 * @param url - Existing IGDB image URL
 * @param newSize - New desired size
 * @returns New image URL with different size
 */
export function resizeIGDBImage(url: string, newSize: IGDBImageSize): string {
	const imageId = extractImageId(url)
	if (!imageId) return url

	return getIGDBImageUrl(imageId, newSize)
}

/**
 * Get multiple sizes of the same image
 * @param imageId - The image_id from IGDB API response
 * @param sizes - Array of desired sizes
 * @returns Object with size as key and URL as value
 */
export function getMultipleImageSizes(imageId: string, sizes: IGDBImageSize[]): Record<IGDBImageSize, string> {
	const result = {} as Record<IGDBImageSize, string>

	sizes.forEach((size) => {
		result[size] = getIGDBImageUrl(imageId, size)
	})

	return result
}

/**
 * Get cover image in common sizes
 * @param imageId - The cover image_id
 * @returns Object with common cover sizes
 */
export function getCoverImageSizes(imageId: string) {
	return getMultipleImageSizes(imageId, ['cover_small', 'cover_big', '720p'])
}

/**
 * Get screenshot in common sizes
 * @param imageId - The screenshot image_id
 * @returns Object with common screenshot sizes
 */
export function getScreenshotImageSizes(imageId: string) {
	return getMultipleImageSizes(imageId, ['screenshot_med', 'screenshot_big', 'screenshot_huge'])
}

/**
 * Get logo in common sizes
 * @param imageId - The logo image_id
 * @returns Object with common logo sizes
 */
export function getLogoImageSizes(imageId: string) {
	return getMultipleImageSizes(imageId, ['thumb', 'logo_med', '720p'])
}
