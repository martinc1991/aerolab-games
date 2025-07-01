import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: string | number
}

export function Title({ children, className, ...props }: TitleProps) {
	return (
		<h1 className={cn('text-main text-[20px] font-[600] leading-6', className)} {...props}>
			{children}
		</h1>
	)
}
