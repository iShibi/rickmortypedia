'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Character, Episode } from '../../types';

interface CharacterCardProps {
	info: Character;
	originEpisode: Episode;
}

export function CharacterCard({ info, originEpisode }: CharacterCardProps) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const locationId = info.location.url.split('/').at(-1)!;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const originLocation = info.origin.url.split('/').at(-1)!;

	return (
		<div className='flex gap-x-4 rounded-md bg-slate-800/90 text-white shadow-lg'>
			<Image
				className='w-auto rounded-l-md'
				src={info.image}
				alt={info.name}
				priority={true}
				width={200}
				height={200}
			/>
			<div className='py-1'>
				<h1 className='text-2xl font-bold hover:text-green-400'>
					<Link href={`/characters/${info.id}`}>{info.name}</Link>
				</h1>
				<p>
					{info.species} - <span className='capitalize'>{info.gender}</span>
				</p>
				<p className='mt-2 text-gray-300'>Status:</p>
				<p>{info.status === 'Alive' ? '🟢 Alive' : info.status === 'Dead' ? '🔴 Dead' : '❔Unknown'}</p>
				<p className='mt-2 text-gray-300'>First seen in episode:</p>
				<p className='inline-block w-fit font-semibold capitalize hover:text-green-400'>
					<Link href={`/episodes/${originEpisode.id}`}>{originEpisode.name}</Link>
				</p>
				<p className='mt-2 text-gray-300'>Origin location:</p>
				<p className='inline-block w-fit font-semibold capitalize hover:text-green-400'>
					<Link href={`/locations/${originLocation}`}>{info.origin.name}</Link>
				</p>
				<p className='mt-2 text-gray-300'>Last known location:</p>
				<p className='inline-block w-fit font-semibold capitalize hover:text-green-400'>
					<Link href={`/locations/${locationId}`}>{info.location.name}</Link>
				</p>
			</div>
		</div>
	);
}
