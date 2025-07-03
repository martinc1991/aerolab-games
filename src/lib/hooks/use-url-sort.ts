import { SortBy, validSortBy } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const SORT_BY_PARAM = 'sortBy'

function isValidSortBy(value: string | null): value is SortBy {
	return value !== null && validSortBy.includes(value as SortBy)
}

export function useUrlSort(defaultSort: SortBy = SortBy.LAST_ADDED) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const initialSortBy = (() => {
		const urlSortBy = searchParams.get(SORT_BY_PARAM)
		return isValidSortBy(urlSortBy) ? urlSortBy : defaultSort
	})()

	const [sortBy, setSortBy] = useState<SortBy>(initialSortBy)

	// Clean up invalid URL parameters
	useEffect(() => {
		const urlSortBy = searchParams.get(SORT_BY_PARAM)

		if (urlSortBy && !isValidSortBy(urlSortBy)) {
			router.replace(window.location.pathname)
		}
	}, [searchParams, router])

	const updateSortBy = useCallback(
		(newSortBy: SortBy) => {
			setSortBy(newSortBy)

			const current = new URLSearchParams(Array.from(searchParams.entries()))
			current.set(SORT_BY_PARAM, newSortBy)
			const search = current.toString()
			const query = search ? `?${search}` : ''

			router.replace(`${window.location.pathname}${query}`)
		},
		[searchParams, router]
	)

	return {
		sortBy,
		setSortBy: updateSortBy,
	}
}
