import { useRouter } from 'next/navigation'

export function useAppNavigation() {
	const router = useRouter()

	function navigateToGame(gameSlug: string) {
		router.push(`/game/${gameSlug}`)
	}

	function goBack() {
		router.back()
	}

	return {
		navigateToGame,
		goBack,
	}
}
