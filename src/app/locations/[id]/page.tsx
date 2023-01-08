import Link from 'next/link';
import { Character, Episode, Location } from '../../../types';
import { CharacterCard } from '../../characters/CharatcerCard';
import { LocationCard } from '../LocationCard';

async function getData(id: number) {
	const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json() as Promise<Location>;
}

async function getCharactersLastSeenHere(ids: Array<string>) {
	const res = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(',')}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	const data = (await res.json()) as Array<Character> | Character;
	return Array.isArray(data) ? data : [data];
}

async function getOriginEpisodesData(ids: Array<string>) {
	const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids.join(',')}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	const data = (await res.json()) as Array<Episode> | Episode;
	return Array.isArray(data) ? data : [data];
}

interface SpecificLocationProps {
	params: {
		id: string;
	};
}

export default async function SpecificLocation({ params }: SpecificLocationProps) {
	const chararcterId = Number.parseInt(params.id);
	const data = await getData(chararcterId);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const charactersLastSeenHereIds = data.residents.map(c => c.split('/').at(-1)!);
	const charactersLastSeenHere = await getCharactersLastSeenHere(charactersLastSeenHereIds);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const originEpisodeIds = charactersLastSeenHere.map(c => c.episode[0].split('/').at(-1)!);
	const originEpisodes = await getOriginEpisodesData(originEpisodeIds);

	return (
		<div className='flex flex-col justify-center gap-y-6 py-6 px-6'>
			<LocationCard info={data} />
			<div className='grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-4'>
				{charactersLastSeenHere.map(c => {
					return (
						<CharacterCard
							key={c.id}
							info={c}
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							originEpisode={originEpisodes.find(e => e.id.toString() === c.episode[0].split('/').at(-1)!)!}
						/>
					);
				})}
			</div>
			<div className='flex flex-row justify-center gap-x-2'>
				<Link href={`/locations/${chararcterId - 1}`}>Prev</Link>
				<Link href={`/locations/${chararcterId + 1}`}>Next</Link>
			</div>
		</div>
	);
}
