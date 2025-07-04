'use client'

import { ShareIcon } from '@/components/svg/share-icon'
import { Button } from '@/components/ui/button'
import { useShareGame } from '@/lib/hooks/use-share-game'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface ShareButtonProps extends HTMLAttributes<HTMLButtonElement> {
	url?: string
}

/**
 * A button component that enables copying an URL to clipboard
 * @param {string} [props.url] - Optional URL to share. If not provided, uses current page URL.
 */
export function ShareButton({ className, url, ...props }: ShareButtonProps) {
	const { handleShare, isDisabled } = useShareGame({ url })

	return (
		<Button variant='collect' onClick={handleShare} className={cn('w-full', className)} disabled={isDisabled} {...props}>
			<ShareIcon />
			Share
		</Button>
	)
}
