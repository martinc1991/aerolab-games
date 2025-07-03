'use client'

import { Typography } from '@/components/typography'
import { Button } from '@/components/ui/button'

export default function ErrorPage({ reset }: { reset: () => void }) {
	return (
		<div className='flex flex-col items-center space-y-6 gap-6 mt-10'>
			<Typography.H1>Something went wrong.</Typography.H1>
			<div className='flex gap-4'>
				<Button className='bg-main hover:bg-main/60 hover:cursor-pointer' onClick={reset}>
					Try again
				</Button>
				<Button className='bg-main hover:bg-main/60 hover:cursor-pointer' onClick={() => (window.location.href = '/')}>
					Go home
				</Button>
			</div>
		</div>
	)
}
