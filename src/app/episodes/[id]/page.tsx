import Link from 'next/link';
import { Character, Episode } from '../../../types';
import { CharacterCard } from '../../characters/CharatcerCard';
import { EpisodeCard } from '../EpisodeCard';

async function getData(id: number) {
	const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json() as Promise<Episode>;
}

async function getCharactersInEpisode(ids: Array<string>) {
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

interface SpecificEpisodeProps {
	params: {
		id: string;
	};
}

export default async function SpecificEpisode({ params }: SpecificEpisodeProps) {
	const chararcterId = Number.parseInt(params.id);
	const data = await getData(chararcterId);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const charactersInEpisodeIds = data.characters.map(c => c.split('/').at(-1)!);
	const charactersInEpisode = await getCharactersInEpisode(charactersInEpisodeIds);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const originEpisodeIds = charactersInEpisode.map(c => c.episode[0].split('/').at(-1)!);
	const originEpisodes = await getOriginEpisodesData(originEpisodeIds);

	return (
		<div className='flex flex-col justify-center gap-y-6 py-6 px-6'>
			<EpisodeCard info={data} />
			<div className='grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-4'>
				{charactersInEpisode.map(c => {
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
				<Link href={`/episodes/${chararcterId - 1}`}>Prev</Link>
				<Link href={`/episodes/${chararcterId + 1}`}>Next</Link>
			</div>
		</div>
	);
}
