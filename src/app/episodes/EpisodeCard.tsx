'use client';

import Link from 'next/link';
import type { Episode } from '../../types';

interface EpisodeCardProps {
	info: Episode;
}

export function EpisodeCard({ info }: EpisodeCardProps) {
	return (
		<>
			<div className='flex flex-col justify-center gap-x-4 rounded-md bg-slate-800/90 px-3 py-2 text-center text-white shadow-lg'>
				<h1 className='m-auto inline-block w-fit text-2xl font-bold hover:text-green-400'>
					<Link href={`/episodes/${info.id}`}>{info.name}</Link>
				</h1>
				<p className='font-mono text-sm capitalize'>{info.episode}</p>
				<p className='mt-2 text-gray-300'>Aired on:</p>
				<p className='font-semibold capitalize'>{info.air_date}</p>
			</div>
		</>
	);
}
