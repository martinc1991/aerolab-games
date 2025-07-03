import { cn } from '@/lib/utils'
import { getIGDBImageWithDimensions, IGDBImageSize } from '@/services/igdb/images'
import Image, { ImageProps } from 'next/image'

interface GameImageProps extends Omit<ImageProps, 'src' | 'width' | 'height'> {
	imageId: string
	imageSize: IGDBImageSize
}

export function GameImage({ imageId, imageSize, className, ...props }: GameImageProps) {
	const { height, url, width } = getIGDBImageWithDimensions(imageId, imageSize)
	const aspectRatio = width / height

	return (
		<div className={cn('relative w-full overflow-hidden rounded-lg', className)} style={{ aspectRatio }}>
			<Image src={url} fill placeholder='blur' blurDataURL={makeColorDataURL({ width, height, color: '#E5E5E5' })} {...props} />
		</div>
	)
}

function makeColorDataURL({ width, height, color }: { width: number; height: number; color: string }) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${color}" /></svg>`
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
