'use client'

import ArrowBack from '@/components/arrow-back'
import { Logo } from '@/components/logo'
import Title from '@/components/typography/title'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
	const pathname = usePathname()

	return pathname === '/' ? <MainHeader /> : <GoBackHeader />
}

function MainHeader() {
	return (
		<div className='flex items-center gap-2 md:justify-center'>
			<Logo />
			<Title>Gaming Haven Z</Title>
		</div>
	)
}

function GoBackHeader() {
	const { back } = useRouter()

	return (
		<div className='flex items-center gap-2'>
			<button onClick={back} className='flex items-center gap-2 px-3 py-2 hover:bg-amber-400 rounded transition-colors'>
				<ArrowBack />
				<span className='text-[16px]'>Back</span>
			</button>
		</div>
	)
}
