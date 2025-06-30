'use client'

import ArrowBack from '@/components/arrow-back'
import { Logo } from '@/components/logo'
import Title from '@/components/typography/title'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
	const pathname = usePathname()

	return (
		<div className='flex flex-col gap-[20px]'>
			{pathname === '/' ? <MainHeader /> : <GoBackHeader />}
			<Input placeholder='Search games...' />
		</div>
	)
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
			<button onClick={back} className='flex items-center gap-2 px-3 py-2'>
				<ArrowBack />
				<span className='text-[16px]'>Back</span>
			</button>
		</div>
	)
}
