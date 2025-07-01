import { cn } from '@/lib/utils'
import { getIGDBImageUrl, IGDBImageSize } from '@/services/igdb'
import Image, { ImageProps } from 'next/image'

interface GameImageProps extends Omit<ImageProps, 'src'> {
	imageId: string
	imageSize?: IGDBImageSize
}

export function GameImage({ imageId, imageSize, className, ...props }: GameImageProps) {
	return (
		<Image
			src={getIGDBImageUrl(imageId, imageSize)}
			// TODO: improve loading
			// placeholder='blur'
			// blurDataURL={getIGDBImageUrl(game.cover?.image_id ?? '', 'thumb')}
			width={264}
			height={374}
			className={cn('object-cover rounded-lg', className)}
			{...props}
		/>
	)
}
