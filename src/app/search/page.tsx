import { IMovie } from '@/interfaces';
import request from '@/utils/axiosClient';
import React from 'react';
import Card from '../(home)/(conponents)/Card';

const getData = async (keyword: string) => {
  const movies: {
    results: Array<IMovie>;
    page: number;
    total_pages: number;
  } = await request.get('/search/movie', {
    params: {
      query: keyword,
    },
  });

  const tv: {
    results: Array<IMovie>;
    page: number;
    total_pages: number;
  } = await request.get('/search/tv', {
    params: {
      query: keyword,
    },
  });

  return { movies, tv };
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const keyword = searchParams?.keyword as string;
  const { movies, tv } = await getData(keyword);
  return (
    <main className="flex-1 flex flex-col gap-y-8 md:gap-y-10 lg:gap-y-12 xl:gap-y-14 py-8 md:py-10 lg:py-12 xl:py-14">
      <section className="container">
        <h1 className="text-lg md:text-xl xl:text-2xl font-bold">
          Result for keyword: {keyword}
        </h1>
      </section>
      <section className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 xl:gap-3">
        {movies.results.length && tv.results.length
          ? [...movies.results, ...tv.results].map((movie, index) => (
              <Card
                key={index}
                movie={{
                  ...movie,
                  media_type: 'tv',
                }}
              />
            ))
          : null}
      </section>
    </main>
  );
}
