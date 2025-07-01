'use client'

import { AutocompleteSearch } from '@/components/autocomplete-search'
import { ArrowBack } from '@/components/svg/arrow-back'
import { Logo } from '@/components/svg/logo'
import { Title } from '@/components/typography/title'
import { useAppNavigation } from '@/lib/hooks/use-app-navigation'
import { usePathname } from 'next/navigation'

export function Header() {
	const pathname = usePathname()

	return (
		<div className='flex flex-col gap-[20px]'>
			{pathname === '/' ? <MainHeader /> : <GoBackHeader />}
			<AutocompleteSearch placeholder='Search games...' />
		</div>
	)
}

function MainHeader() {
	return (
		<div className='flex items-center gap-2 sm:justify-center'>
			<Logo />
			<Title>Gaming Haven Z</Title>
		</div>
	)
}

function GoBackHeader() {
	const { goBack } = useAppNavigation()

	return (
		<div className='flex items-center gap-2 sm:w-[358px] sm:place-self-center'>
			<button onClick={goBack} className='flex items-center gap-2 px-3 py-2 cursor-pointer'>
				<ArrowBack />
				<span className='text-[16px]'>Back</span>
			</button>
		</div>
	)
}
