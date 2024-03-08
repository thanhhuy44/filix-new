import { IMovie } from '@/interfaces';
import request from '@/utils/axiosClient';
import Hero from './(conponents)/Hero';

const getData = async () => {
  const nowPlayingMovies = await request.get('/movie/now_playing');
  // const popularMovies = await request.get('/movie/popular');
  // const topRatedMovies = await request.get('/movie/top_rated');
  // const upcomingMovies = await request.get('/movie/upcoming');
  return {
    nowPlayingMovies: (nowPlayingMovies?.results.length
      ? nowPlayingMovies?.results
      : []) as Array<IMovie>,
    // popularMovies: (popularMovies?.results.length
    //   ? popularMovies?.results
    //   : []) as Array<IMovie>,
    // topRatedMovies: (topRatedMovies?.results.length
    //   ? topRatedMovies?.results
    //   : []) as Array<IMovie>,
    // upcomingMovies: (upcomingMovies?.results.length
    //   ? upcomingMovies?.results
    //   : []) as Array<IMovie>,
  };
};

async function Page() {
  const { nowPlayingMovies } = await getData();
  // console.log('🚀 ~ Page ~ data:', data);
  return (
    <main>
      <Hero movies={nowPlayingMovies} />
    </main>
  );
}

export default Page;
