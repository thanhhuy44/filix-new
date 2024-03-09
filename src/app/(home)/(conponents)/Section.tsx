import { IMovie } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import Card from './Card';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

interface Props {
  list: Array<IMovie>;
  title: string;
  seeAll?: string;
}

export default function Section({ list, title, seeAll }: Props) {
  return (
    <section className="container flex flex-col gap-y-3 md:gap-y-4 xl:gap-y-6">
      <div className="flex items-center justify-between gap-x-4">
        <h1 className="text-white font-bold text-xl 2xl:text-2xl">{title}</h1>
        {seeAll ? (
          <Link
            href={seeAll}
            className="text-sm text-white flex items-center gap-x-1 hover:text-secondary-1 duration-300">
            <span>See All</span>
            <ArrowRight />
          </Link>
        ) : null}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 xl:gap-3">
        {list.length
          ? list.map((movie, index) => <Card key={index} movie={movie} />)
          : null}
      </div>
    </section>
  );
}
