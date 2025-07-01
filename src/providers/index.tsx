import { Toaster } from '@/components/ui/sonner'
import { ColectedGamesProvider } from '@/providers/collected-games'
import React from 'react'

export async function RootProvider(props: { children: React.ReactNode }) {
	return (
		<ColectedGamesProvider>
			{props.children}
			<Toaster />
		</ColectedGamesProvider>
	)
}
