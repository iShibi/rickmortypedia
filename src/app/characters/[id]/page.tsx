import Link from 'next/link';
import { Character, Episode } from '../../../types';
import { EpisodeCard } from '../../episodes/EpisodeCard';
import { CharacterCard } from '../CharatcerCard';

async function getData(id: number) {
	const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json() as Promise<Character>;
}

async function getOriginEpisodeData(id: string) {
	const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json() as Promise<Episode>;
}

async function getAllEpisodesData(ids: Array<string>) {
	const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids.join(',')}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	const data = (await res.json()) as Array<Episode> | Episode;
	return Array.isArray(data) ? data : [data];
}

interface SpecificCharacterProps {
	params: {
		id: string;
	};
}

export default async function SpecificCharacter({ params }: SpecificCharacterProps) {
	const chararcterId = Number.parseInt(params.id);
	const data = await getData(chararcterId);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const originEpisodeId = data.episode[0].split('/').at(-1)!;
	const originEpisode = await getOriginEpisodeData(originEpisodeId);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const episodeIds = data.episode.map(e => e.split('/').at(-1)!);
	const episodes = await getAllEpisodesData(episodeIds);

	return (
		<div className='flex flex-col justify-center gap-y-6 py-6 px-6'>
			<CharacterCard info={data} originEpisode={originEpisode} />
			<div className='grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-4'>
				{episodes.map(e => {
					return <EpisodeCard key={e.id} info={e} />;
				})}
			</div>
			<div className='flex flex-row justify-center gap-x-2'>
				<Link href={`/characters/${chararcterId - 1}`}>Prev</Link>
				<Link href={`/characters/${chararcterId + 1}`}>Next</Link>
			</div>
		</div>
	);
}
