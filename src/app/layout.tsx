import { Header } from '@/components/header'
import { RootProvider } from '@/providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Aerolab Games',
	description: 'Aerolab Games',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} antialiased h-screen`}>
				<RootProvider>
					<main className='flex flex-col gap-6 my-4 p-4 max-w-3xl mx-auto'>
						<div className='w-full'>
							<Header />
						</div>
						{children}
					</main>
				</RootProvider>
			</body>
		</html>
	)
}
