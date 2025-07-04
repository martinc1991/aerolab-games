import { Toaster } from '@/components/ui/sonner'
import { TOAST_DURATION } from '@/config/constants'
import { CollectedGamesProvider } from '@/providers/collected-games'
import React from 'react'

export function RootProvider(props: { children: React.ReactNode }) {
	return (
		<CollectedGamesProvider>
			{props.children}
			<Toaster duration={TOAST_DURATION} />
		</CollectedGamesProvider>
	)
}
