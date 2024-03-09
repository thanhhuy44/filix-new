import { IMovie } from '@/interfaces';
import request from '@/utils/axiosClient';
import Hero from './(conponents)/Hero';
import Section from './(conponents)/Section';

const getData = async () => {
  const trendingList = await request.get('/trending/all/day');
  const nowPlayingMovies = await request.get('/movie/now_playing');
  const popularMovies = await request.get('/movie/popular');
  const topRatedMovies = await request.get('/movie/top_rated');
  const upcomingMovies = await request.get('/movie/upcoming');
  return {
    trending: (trendingList?.results.length
      ? trendingList.results
      : []) as Array<IMovie>,
    nowPlayingMovies: (nowPlayingMovies?.results.length
      ? nowPlayingMovies?.results
      : []) as Array<IMovie>,
    popularMovies: (popularMovies?.results.length
      ? popularMovies?.results
      : []) as Array<IMovie>,
    topRatedMovies: (topRatedMovies?.results.length
      ? topRatedMovies?.results
      : []) as Array<IMovie>,
    upcomingMovies: (upcomingMovies?.results.length
      ? upcomingMovies?.results
      : []) as Array<IMovie>,
  };
};

async function Page() {
  const {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    trending,
  } = await getData();
  // console.log('🚀 ~ Page ~ data:', data);
  return (
    <main className="flex flex-col gap-y-6 md:gap-y-8 xl:gap-y-12 pb-8 md:pb-12 lg:pb-16 xl:pb-20">
      <Hero movies={trending} />
      <Section title="Now Playing" list={nowPlayingMovies} seeAll="#" />
      <Section title="Popular" list={popularMovies} seeAll="#" />
      <Section title="Top Rated" list={topRatedMovies} seeAll="#" />
      <Section title="Upcoming" list={upcomingMovies} seeAll="#" />
    </main>
  );
}

export default Page;
