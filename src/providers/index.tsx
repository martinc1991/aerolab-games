import { ColectedGamesProvider } from '@/providers/collected-games'
import { getPopularGames } from '@/services/igdb'
import React from 'react'

export async function RootProvider(props: { children: React.ReactNode }) {
	const popularGames = await getPopularGames(10) // TODO: read from local storage

	return <ColectedGamesProvider initialGames={popularGames}>{props.children}</ColectedGamesProvider>
}
