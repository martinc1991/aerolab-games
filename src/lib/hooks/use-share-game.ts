'use client'

import { toast } from '@/components/toast'
import { useMemo, useState } from 'react'
import { useCopyToClipboard, useDebounceCallback } from 'usehooks-ts'

interface UseShareGameOptions {
	url?: string
	disableDuration?: number
}

/**
 * A hook that enables sharing functionality
 * @param {string} [props.url] - Optional URL to share. If not provided, uses current page URL.
 * @param {number} [props.disableDuration] - The duration to disable the button after copying the link.
 */
export function useShareGame({ url, disableDuration = 3000 }: UseShareGameOptions = {}) {
	const [isDisabled, setIsDisabled] = useState(false)
	const [copiedText, copy] = useCopyToClipboard()
	const debounceResetDisabled = useDebounceCallback(() => setIsDisabled(false), disableDuration)

	const currentUrl = useMemo(() => {
		return url || window.location.href
	}, [url])

	async function handleShare() {
		setIsDisabled(true)

		try {
			const success = await copy(currentUrl)

			if (success) {
				toast({
					title: 'Link copied!',
					description: 'Game link has been copied to your clipboard',
				})
			} else {
				toast({
					title: 'Failed to copy link',
					description: 'Unable to copy link to clipboard',
				})
			}
		} catch (error) {
			toast({
				title: 'Failed to copy link',
				description: 'An unexpected error occurred',
			})
		} finally {
			debounceResetDisabled()
		}
	}

	return {
		handleShare,
		isDisabled,
		currentUrl,
		copiedText,
	}
}
