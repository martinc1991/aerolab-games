'use client'

import { SearchInput } from '@/components/search-input'
import { ArrowBack } from '@/components/svg/arrow-back'
import { Logo } from '@/components/svg/logo'
import { Typography } from '@/components/typography'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
	const pathname = usePathname()

	return (
		<div className='flex flex-col gap-[20px]'>
			{pathname === '/' ? <MainHeader /> : <GoBackHeader />}
			<SearchInput />
		</div>
	)
}

function MainHeader() {
	return (
		<div className='flex items-center gap-2 sm:justify-center'>
			<GoHomeLink />
			<Typography.H1>Gaming Haven Z</Typography.H1>
		</div>
	)
}

function GoBackHeader() {
	const router = useRouter()

	return (
		<div className='flex items-center gap-2 sm:w-[358px] sm:place-self-center'>
			<GoHomeLink />
			<button onClick={() => router.back()} className='flex items-center gap-2 px-3 cursor-pointer'>
				<Typography.Highlighted className='text-[16px] font-semibold flex items-center gap-1'>
					<ArrowBack />
					Back
				</Typography.Highlighted>
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
