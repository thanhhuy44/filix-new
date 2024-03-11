'use client';

import { IMAGE_ORIGIN_PATH } from '@/constants';
import { IMovie } from '@/interfaces';
import { Star } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Props {
  movies: Array<IMovie>;
}

export default function Hero({ movies }: Props) {
  return (
    <section className="py-6 md:py-10 xl:py-12 border-b border-t border-grey-dark">
      <div className="container">
        {movies.length ? (
          <Swiper
            autoplay={{
              delay: 5000,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}>
            {movies.map((movie, index) => (
              <SwiperSlide className="!h-auto" key={index}>
                <div className="rounded-md overflow-hidden border border-gray-600 cursor-grab h-full flex flex-col">
                  <Image
                    fill
                    src={IMAGE_ORIGIN_PATH + movie.backdrop_path}
                    alt={'Filix - ' + movie.title}
                    className="!static !w-full !h-full flex-1 object-cover object-center"
                  />
                  <div className="p-2 md:p-3 xl:p-4 bg-primary-2 grid grid-cols-2 gap-x-3 items-center">
                    <div className="flex flex-col gap-y-2">
                      <Link
                        href={
                          (movie.media_type as string) === 'tv'
                            ? '/tv/' +
                              movie?.name?.toLowerCase().replaceAll(' ', '-') +
                              '-' +
                              movie.id
                            : '/movie/' +
                              movie?.title?.toLowerCase().replaceAll(' ', '-') +
                              '-' +
                              movie.id
                        }
                        className="line-clamp-1 font-bold text-base md:text-lg xl:text-xl text-white hover:text-secondary-1 duration-150">
                        {movie.title || movie.name}
                      </Link>
                      <div className="flex items-center text-gray-400 text-sm gap-x-3">
                        <p>
                          {movie.release_date
                            ? movie.release_date.split('-')[0]
                            : movie.first_air_date
                            ? movie.first_air_date.split('-')[0]
                            : ''}{' '}
                        </p>
                        <div className="flex items-center gap-x-1">
                          <Star weight="fill" className="text-secondary-3" />
                          <p>{movie.vote_average.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="w-full border-gray-500 border text-center select-none p-2 rounded-full text-white hover:bg-secondary-1 duration-300 hover:border-none hover:text-grey-dark font-semibold"
                      href={
                        (movie.media_type as string) === 'tv'
                          ? '/tv/' +
                            movie?.name?.toLowerCase().replaceAll(' ', '-') +
                            '-' +
                            movie.id
                          : '/movie/' +
                            movie?.title?.toLowerCase().replaceAll(' ', '-') +
                            '-' +
                            movie.id
                      }>
                      Watch Now
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </section>
  );
}
