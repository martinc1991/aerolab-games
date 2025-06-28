interface TitleProps {
	children: string | number
}

export default function Title({ children }: TitleProps) {
	return <h1 className='text-main text-[20px] font-[600]'>{children}</h1>
}
