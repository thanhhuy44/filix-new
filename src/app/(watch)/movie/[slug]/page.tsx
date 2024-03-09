import PlayerMovie from '@/components/PlayerMovie';
import { IMAGE_ORIGIN_PATH } from '@/constants';
import { IDetail, IMovie } from '@/interfaces';
import request from '@/utils/axiosClient';
import { Star } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import React from 'react';

const getData = async (id: string) => {
  const infoMovie: IDetail = await request.get('/movie/' + id);
  const similars: Array<IMovie> = await request.get(
    '/movie/' + id + '/similar'
  );
  return { infoMovie, similars };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-')[params.slug.split('-').length - 1];
  const { infoMovie } = await getData(id);
  //   console.log('🚀 ~ Page ~ infoMovie:', infoMovie);

  return (
    <main className="flex-1 container grid grid-cols-5 gap-4 py-10">
      <div className="col-span-5 xl:col-span-4 flex flex-col gap-y-4 xl:gap-y-8">
        {/* <Image
          alt={`Filix - ${infoMovie.title}`}
          src={IMAGE_ORIGIN_PATH + infoMovie.backdrop_path}
          fill
          className="!static !w-full !h-auto"
        /> */}
        <PlayerMovie id={id} />
        <div className="p-4 rounded-md border border-grey-dark bg-primary-2">
          <h1 className="font-bold">Comment</h1>
        </div>
      </div>
      <div className="col-span-5 xl:col-span-1 bg-primary-2 rounded-md border border-grey-dark">
        <div className="p-2 flex flex-col gap-y-2">
          <Image
            src={IMAGE_ORIGIN_PATH + infoMovie.poster_path}
            fill
            className="!static sm:max-w-xs xl:max-w-none !w-full !h-auto rounded"
            alt={`Filix - ${infoMovie.title}`}
          />
          <h1 className="text-lg font-bold text-white">{infoMovie.title}</h1>
          <div className="flex items-center gap-x-4 text-xs lg:text-sm text-gray-400">
            <p>{infoMovie.release_date.split('-')[0]}</p>
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
                <td>{infoMovie.release_date}</td>
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
    </main>
  );
}
