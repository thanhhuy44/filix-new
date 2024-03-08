'use client';

import { IMAGE_ORIGIN_PATH } from '@/constants';
import { IMovie } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  movies: Array<IMovie>;
}

export default function Hero({ movies }: Props) {
  console.log('🚀 ~ Hero ~ movies:', movies);
  return (
    <section>
      <div className="container">
        {movies.length ? (
          <Swiper
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
              <SwiperSlide key={index}>
                <Image
                  fill
                  src={IMAGE_ORIGIN_PATH + movie.backdrop_path}
                  alt={'Filix - ' + movie.title}
                  className="!static !w-full !h-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </section>
  );
}
