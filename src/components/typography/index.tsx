import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

const gradientClass = 'bg-gradient-to-r from-[#3C1661] to-[#6727A6] bg-clip-text text-transparent'

// Headings
export function H1({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return <h1 className={cn(gradientClass, 'text-[20px] font-[700] sm:text-[24px]', className)} {...props} />
}

export function H2({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return <h2 className={cn(gradientClass, 'text-[18px] font-semibold leading-5', className)} {...props} />
}

export function H3({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={cn(gradientClass, 'text-[16px] font-semibold', className)} {...props} />
}

// Styled
export function Highlighted({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
	return <span className={cn(gradientClass, className)} {...props} />
}

export function Muted({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
	return <span className={cn('text-gray-500', className)} {...props} />
}

// Paragraph
export function P({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cn('text-[16px] leading-5 text-gray-900')} {...props} />
}

export const Typography = {
	H1,
	H2,
	H3,
	Highlighted,
	Muted,
	P,
}
