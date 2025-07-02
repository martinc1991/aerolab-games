'use client'

import { Title } from '@/components/typography/title'
import { Button } from '@/components/ui/button'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className='flex flex-col items-center space-y-6 gap-6 mt-10'>
			<Title>Something went wrong.</Title>
			<div className='flex gap-4'>
				<Button className='bg-main' onClick={reset}>
					Try again
				</Button>
				<Button className='bg-main' onClick={() => (window.location.href = '/')}>
					Go home
				</Button>
			</div>
		</div>
	)
}
