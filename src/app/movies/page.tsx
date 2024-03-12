import { IMovie } from '@/interfaces';
import request from '@/utils/axiosClient';
import React from 'react';
import Card from '../(home)/(conponents)/Card';

const getData = async () => {
  const trendingList: {
    results: Array<IMovie>;
    page: number;
    total_pages: number;
  } = await request.get('/discover/movie');

  return trendingList;
};

export default async function Page() {
  const movies = await getData();
  return (
    <main className="flex-1 flex flex-col gap-y-8 md:gap-y-10 lg:gap-y-12 xl:gap-y-14 py-8 md:py-10 lg:py-12 xl:py-14">
      <section className="container">
        <h1 className="text-lg md:text-xl xl:text-2xl font-bold">Movies</h1>
      </section>
      <section className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 xl:gap-3">
        {movies.results.length
          ? movies.results.map((movie, index) => (
              <Card key={index} movie={movie} />
            ))
          : null}
      </section>
    </main>
  );
}
