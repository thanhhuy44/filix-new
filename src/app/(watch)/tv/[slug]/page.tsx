import Comment from '@/components/Comment';
import PlayerTV from '@/components/PlayerTV';
import { IMAGE_ORIGIN_PATH } from '@/constants';
import { IComment, IDetail, IMovie } from '@/interfaces';
import createCustomFetch from '@/utils/fetchClient';
import { Star } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const runtime = 'edge';

const getData = async (id: string) => {
  const customFetch = createCustomFetch({
    method: 'GET',
  });
  const infoMovie: IDetail = await customFetch('/tv/' + id);
  const similars = await customFetch('/tv/' + id + '/similar');
  const comments: { results: IComment[] } = await customFetch(
    '/tv/' + id + '/reviews'
  );
  return { infoMovie, similars, comments };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-')[params.slug.split('-').length - 1];
  const { infoMovie, similars, comments } = await getData(id);
  //   console.log('🚀 ~ Page ~ infoMovie:', infoMovie);
  const similarsMovies: Array<IMovie> = similars.results;

  return (
    <main className="flex-1 container grid grid-cols-5 gap-4 py-10">
      <div className="col-span-5 xl:col-span-4 flex flex-col gap-y-4 xl:gap-y-8">
        {/* <Image
          alt={`Filix - ${infoMovie.title}`}
          src={IMAGE_ORIGIN_PATH + infoMovie.backdrop_path}
          fill
          className="!static !w-full !h-auto"
        /> */}
        <PlayerTV
          seasons={
            infoMovie.seasons as Array<{
              id: number;
              name: string;
            }>
          }
          id={id}
        />
        <Comment comments={comments.results} />
      </div>
      <div className="col-span-5 xl:col-span-1 flex flex-col gap-y-6">
        <div className="bg-primary-2 rounded-md border border-grey-dark">
          <div className="p-2 flex flex-col gap-y-2">
            <Image
              src={IMAGE_ORIGIN_PATH + infoMovie.poster_path}
              fill
              className="!static sm:max-w-xs xl:max-w-none !w-full !h-auto rounded"
              alt={`Filix - ${infoMovie.title}`}
            />
            <h1 className="text-lg font-bold text-white">{infoMovie.title}</h1>
            <div className="flex items-center gap-x-4 text-xs lg:text-sm text-gray-400">
              <p>{infoMovie.first_air_date.split('-')[0]}</p>
              <div className="flex items-center gap-x-1">
                <Star weight="fill" className="text-secondary-3" />
                <p>{infoMovie.vote_average.toFixed(1)}</p>
              </div>
              <p>{infoMovie.runtime} m</p>
            </div>
          </div>
          <div className="border-y border-grey-dark bg-primary-3 p-2">
            <p className="text-gray-400 text-sm">{infoMovie.overview}</p>
          </div>
          <div className="p-2 text-gray-400 text-sm">
            <table id="info-table">
              <tbody>
                <tr>
                  <td>Type:</td>
                  <td>Movie</td>
                </tr>
                <tr>
                  <td>Release:</td>
                  <td>{infoMovie.first_air_date}</td>
                </tr>
                <tr>
                  <td>Duration:</td>
                  <td>{infoMovie.runtime}m</td>
                </tr>
                <tr>
                  <td>Genres:</td>
                  <td>
                    {infoMovie.genres.map((genre, index) => (
                      <>
                        {index ? ', ' : ''}
                        <span key={index}>{genre.name}</span>
                      </>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Country:</td>
                  <td>
                    {infoMovie.production_countries.map((country, index) => (
                      <>
                        {index ? ', ' : ''}
                        <span key={index}>{country.name}</span>
                      </>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Production:</td>
                  <td>
                    {infoMovie.production_companies.map((production, index) => (
                      <>
                        {index ? ', ' : ''}
                        <span key={index}>{production.name}</span>
                      </>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-primary-2 rounded-md border border-grey-dark">
          <h5 className="p-2">You may like</h5>
          {similars.results?.length
            ? similarsMovies?.map((similar, index) => (
                <Link
                  key={index}
                  href={'#'}
                  className="flex items-center gap-x-2 p-2 border-t border-grey-dark hover:bg-primary-3 duration-300">
                  <Image
                    width={200}
                    height={200}
                    src={IMAGE_ORIGIN_PATH + similar.poster_path}
                    alt={similar.title || (similar.name as string)}
                    className="max-w-10"
                  />
                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm text-white font-semibold line-clamp-1">
                      {similar.name || similar.title}
                    </h5>
                    <div className="flex items-center gap-x-3 text-xs text-gray-400">
                      <p>{similar.first_air_date?.split('-')[0]}</p>
                      <div className="flex items-center gap-x-[2px]">
                        <Star className="text-secondary-1" weight="fill" />
                        <p>{similar.vote_average.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </main>
  );
}
