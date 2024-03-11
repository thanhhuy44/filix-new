'use client';
import { IEpisode } from '@/interfaces';
import createCustomFetch from '@/utils/fetchClient';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useClickAway } from '@uidotdev/usehooks';
import React, { LegacyRef, useEffect, useState } from 'react';

interface Props {
  id: string;
  seasons: Array<{
    id: number;
    name: string;
  }>;
}

export default function PlayerTV({ id, seasons }: Props) {
  const [server, setServer] = useState<number>(1);
  const [ep, setEp] = useState<IEpisode>();
  const [listEp, setListEp] = useState<Array<IEpisode>>([]);
  const [season, setSeason] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const ref = useClickAway(() => setOpen(false));

  const handleGetEp = async (season: number) => {
    const customFetch = createCustomFetch({
      method: 'GET',
    });
    const response: { episodes: Array<IEpisode> } = await customFetch(
      `/tv/${id}/season/${season}`
    );
    console.log('🚀 ~ handleGetEp ~ response:', response);
    if (response) {
      setListEp(response.episodes);
    }
  };

  useEffect(() => {
    handleGetEp(season);
  }, [season]);

  return (
    <div className="overflow-visible rounded-md border border-grey-dark flex flex-col">
      <div className="rounded-t-md overflow-hidden">
        {server === 1 ? (
          <iframe
            src={`https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${
              ep?.episode_number || 1
            }`}
            frameBorder="0"
            className="w-full aspect-video"
            referrerPolicy="origin"
            allowFullScreen></iframe>
        ) : (
          <embed
            className="w-full aspect-video"
            src={`https://vidsrc.to/embed/tv/${id}/${season}/${
              ep?.episode_number || 1
            }`}></embed>
        )}
      </div>
      <div className="flex items-center justify-center py-8 bg-primary-2 gap-x-4">
        <button
          disabled={server === 1}
          onClick={() => setServer(1)}
          className={`py-2 px-8 border rounded-lg  ${
            server === 1
              ? 'border-secondary-1 text-secondary-1'
              : 'border-grey-light'
          }`}>
          Server 1
        </button>
        <button
          disabled={server === 2}
          onClick={() => setServer(2)}
          className={`py-2 px-8 border rounded-lg  ${
            server === 2
              ? 'border-secondary-1 text-secondary-1'
              : 'border-grey-light'
          }`}>
          Server 2
        </button>
      </div>
      <div className="flex flex-col p-8 gap-4 overflow-visible">
        <div className="flex items-center gap-x-2 overflow-visible">
          <h4>Season</h4>
          <div
            className="relative h-fit flex items-center overflow-visible"
            ref={ref as LegacyRef<HTMLDivElement>}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              disabled={seasons.length <= 1}
              className="w-[150px] h-8 bg-white rounded-xl text-black flex items-center px-2 cursor-pointer">
              <p className="flex-1 line-clamp-1 break-all">
                {seasons[season - 1]?.name || 'Season 1'}
              </p>
              {seasons.length > 1 ? <CaretDown /> : null}
            </button>
            <div
              className={`absolute top-full mt-2 left-0 w-[200px] max-h-[200px] overflow-auto rounded-lg duration-200 origin-top ${
                open ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
              }`}>
              {seasons.map((item, index) => {
                const isActive = index + 1 === season;
                return (
                  <div
                    onClick={() => {
                      setSeason(index + 1);
                      setOpen(false);
                    }}
                    key={index}
                    className={` text-black px-2 py-1 text-sm font-medium h-full cursor-pointer duration-200 select-none ${
                      isActive ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'
                    }`}>
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {listEp?.map((item, index) => {
            const isActive = ep
              ? item.episode_number === ep?.episode_number &&
                item.season_number === ep.season_number
              : index === 0 && item.season_number === 1;
            return (
              <div
                onClick={() => setEp(item)}
                className={`p-2 border rounded-md cursor-pointer duration-150 select-none ${
                  isActive
                    ? 'border-secondary-1 text-secondary-1 bg-primary-2'
                    : 'border-gray-400 hover:bg-primary-2'
                }`}
                key={index}>
                <p className="line-clamp-1 text-sm">{`Episode ${item.episode_number}: ${item.name}`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
