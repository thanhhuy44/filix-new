'use client';

import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Page() {
  return (
    <main className="container flex-1 flex flex-col gap-y-5 lg:gap-y-8">
      <section className="grid grid-cols-1 gap-x-3 md:grid-cols-2 xl:grid-cols-3 md:gap-y-4 xl:gap-y-6">
        {[1, 1, 1].map((_, index) => (
          <Skeleton key={index} className="aspect-video rounded-md" />
        ))}
      </section>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 xl:gap-3">
        {Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`).map(
          (_, index) => (
            <div className="flex flex-col gap-y-1">
              <Skeleton key={index} className="w-full aspect-[3/4]" />
              <Skeleton count={2} />
            </div>
          )
        )}
      </div>
    </main>
  );
}
