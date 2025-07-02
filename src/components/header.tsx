'use client'

import { AutocompleteSearch } from '@/components/autocomplete-search'
import { ArrowBack } from '@/components/svg/arrow-back'
import { Logo } from '@/components/svg/logo'
import { Title } from '@/components/typography/title'
import Link from 'next/link'
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
			<GoHomeLink />
			<Title>Gaming Haven Z</Title>
		</div>
	)
}

function GoBackHeader() {
	const router = useRouter()

	return (
		<div className='flex items-center gap-2 sm:w-[358px] sm:place-self-center'>
			<GoHomeLink />
			<button onClick={() => router.back()} className='flex items-center gap-2 px-3 cursor-pointer'>
				<ArrowBack />
				<span className='text-[16px] font-semibold'>Back</span>
			</button>
		</div>
	)
}

function GoHomeLink() {
	return (
		<Link href='/' className='cursor-pointer'>
			<Logo />
		</Link>
	)
}
