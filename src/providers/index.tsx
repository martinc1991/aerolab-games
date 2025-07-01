import { Toaster } from '@/components/ui/sonner'
import { CollectedGamesProvider } from '@/providers/collected-games'
import React from 'react'

export async function RootProvider(props: { children: React.ReactNode }) {
	return (
		<CollectedGamesProvider>
			{props.children}
			<Toaster />
		</CollectedGamesProvider>
	)
}
