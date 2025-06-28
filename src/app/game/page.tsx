//  DELETE: just for testing

export default async function GamePage() {
	return (
		<div className='space-y-4'>
			<h1 className='text-2xl font-bold'>Game</h1>
			<div className='bg-green-300 p-4 rounded'>
				<p>This page automatically uses the back button header!</p>
				<p>
					The header is defined in: <code>src/app/@header/default.tsx</code>
				</p>
			</div>
		</div>
	)
}
