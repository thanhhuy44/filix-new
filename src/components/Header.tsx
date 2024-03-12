'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { List, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  return (
    <header className="bg-primary-2 text-white">
      <div className="container flex items-center justify-between gap-x-4 py-2 md:py-3 lg:py-4">
        <div>
          <Link href={'/'}>Filix</Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center w-full max-w-md text-white text-sm lg:text-base px-2 py-1 border rounded-md border-gray-400">
            <input
              size={1}
              type="text"
              placeholder="Search"
              className="bg-transparent flex-1 outline-none"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push('/search?keyword=' + keyword);
                }
              }}
            />
            <MagnifyingGlass
              onClick={() => router.push('/search?keyword=' + keyword)}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="cursor-pointer">
          <List size={28} />
        </div>
      </div>
    </header>
  );
}
