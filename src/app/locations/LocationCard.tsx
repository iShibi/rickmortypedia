'use client';

import Link from 'next/link';
import type { Location } from '../../types';

interface LocationCardProps {
	info: Location;
}

export function LocationCard({ info }: LocationCardProps) {
	return (
		<div className='flex justify-center gap-x-4 rounded-md bg-slate-800/90 px-3 text-center text-white shadow-lg'>
			<div className='py-1'>
				<h1 className='text-2xl font-bold hover:text-green-400'>
					<Link href={`/locations/${info.id}`}>{info.name}</Link>
				</h1>
				<p className='mt-2 text-gray-300'>Location type:</p>
				<p className='text-lg font-semibold capitalize'>{info.type}</p>
				<p className='mt-2 text-gray-300'>Dimension:</p>
				<p className='text-lg font-semibold capitalize'>{info.dimension}</p>
			</div>
		</div>
	);
}
