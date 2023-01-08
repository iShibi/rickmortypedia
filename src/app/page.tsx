import Link from 'next/link';

export default function HomePage() {
	return (
		<main className='grid min-h-screen items-center'>
			<div className='flex flex-col gap-y-4 px-6 font-mono text-2xl text-white'>
				{['Characters', 'Locations', 'Episodes'].map(e => {
					return (
						<Link
							key={e}
							href={`/${e.toLowerCase()}/1`}
							className='m-auto inline-block w-60 rounded-md bg-slate-800/90 py-4 px-4 text-center shadow-lg hover:bg-green-600 hover:text-black'
						>
							{e}
						</Link>
					);
				})}
			</div>
		</main>
	);
}
