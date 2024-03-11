'use client';
import React, { useState } from 'react';

interface Props {
  id: string;
}

export default function PlayerMovie({ id }: Props) {
  const [server, setServer] = useState<number>(1);
  return (
    <div className="rounded-md overflow-hidden border border-grey-dark flex flex-col">
      {server === 1 ? (
        <iframe
          autoFocus
          className="w-full aspect-video"
          src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
          referrerPolicy="origin"
          allowFullScreen></iframe>
      ) : (
        <embed
          className="w-full aspect-video"
          src={`https://vidsrc.to/embed/movie/${id}`}></embed>
      )}
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
    </div>
  );
}
