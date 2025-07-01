'use client'

import { CheckIcon } from '@/components/svg/check-icon'
import { toast as sonnerToast } from 'sonner'

export function toast(toast: Omit<ToastProps, 'id'>) {
	return sonnerToast.custom((id) => <Toast id={id} title={toast.title} description={toast.description} />)
}

interface ToastProps {
	id: string | number
	title: string
	description: string
}

function Toast(props: ToastProps) {
	const { title, description } = props

	return (
		<div className='flex rounded-xl bg-white border border-green-500 shadow-lg shadow-black/30 w-full md:max-w-[364px] items-center p-4'>
			<div className='flex flex-1 items-center'>
				<div className='flex flex-col gap-2 w-full'>
					<div className='flex items-center gap-2'>
						<CheckIcon />
						<p className='font-semibold text-black leading-5'>{title}</p>
					</div>
					<p className='text-[14px] text-[#666666] leading-5'>{description}</p>
				</div>
			</div>
		</div>
	)
}
