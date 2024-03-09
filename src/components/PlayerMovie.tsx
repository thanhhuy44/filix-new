'use client';
import React, { useState } from 'react';

interface Props {
  id: string;
}

export default function PlayerMovie({ id }: Props) {
  const [server, setServer] = useState<number>(1);
  return (
    <div className="rounded-md overflow-hidden border border-grey-dark">
      <iframe
        autoFocus
        className="w-full aspect-video"
        src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
        referrerPolicy="origin"
        allowFullScreen></iframe>
      <div className=""></div>
    </div>
  );
}
