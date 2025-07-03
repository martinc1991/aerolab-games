import { Header } from '@/components/header'
import { APP_DESCRIPTION, APP_NAME } from '@/config/constants'
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
	title: APP_NAME,
	description: APP_DESCRIPTION,
	openGraph: {
		title: APP_NAME,
		description: APP_DESCRIPTION,
		url: 'https://aerolab-games.vercel.app/',
		siteName: APP_NAME,
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: APP_NAME,
		description: APP_DESCRIPTION,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} antialiased h-fit`}>
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
