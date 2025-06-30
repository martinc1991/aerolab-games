'use client'

import { ArrowBack } from '@/components/arrow-back'
import { AutocompleteSearch } from '@/components/autocomplete-search'
import { Logo } from '@/components/logo'
import { Title } from '@/components/typography/title'
import { usePathname, useRouter } from 'next/navigation'

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
	const { back } = useRouter()

	return (
		<div className='flex items-center gap-2 sm:w-[358px] sm:place-self-center'>
			<button onClick={back} className='flex items-center gap-2 px-3 py-2 cursor-pointer'>
				<ArrowBack />
				<span className='text-[16px]'>Back</span>
			</button>
		</div>
	)
}
