import { IMAGE_ORIGIN_PATH } from '@/constants';
import { IMovie } from '@/interfaces';
import { Play, Star } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import React from 'react';

interface Props {
  movie: IMovie;
}

export default function Card({ movie }: Props) {
  return (
    <div className="border-grey-dark border rounded-md overflow-hidden group cursor-pointer flex flex-col h-full">
      <div className="overflow-hidden flex-1 relative">
        <Image
          fill
          src={IMAGE_ORIGIN_PATH + movie.poster_path}
          alt={'Filix - ' + movie.title}
          className="!static !w-full !h-full object-center object-cover group-hover:scale-110 duration-300"
        />
        <div className="absolute left-0 right-0 bottom-0 top-0 z-10 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200">
          <div className="w-16 h-16 border-2 rounded-full flex items-center justify-center border-secondary-3 text-secondary-3">
            <Play weight="fill" size={36} />
          </div>
        </div>
      </div>
      <div className="p-2 bg-primary-2 flex flex-col gap-y-1">
        <h5 className="text-white font-medium text-sm lg:text-base line-clamp-1 group-hover:text-secondary-3 duration-300">
          {movie.title || movie.name}
        </h5>
        <div className="flex items-center gap-x-2 text-xs lg:text-sm text-gray-400">
          {movie?.release_date ? (
            <p>{movie.release_date.split('-')[0]}</p>
          ) : null}
          <div className="flex items-center gap-x-1">
            <Star weight="fill" className="text-secondary-3" />
            <p>{movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
