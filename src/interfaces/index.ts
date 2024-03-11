export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: string;
  first_air_date?: string;
  name?: string;
}

export interface IDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  seasons: Array<{
    id: number;
    name: string;
  }>;
}

export interface IComment {
  author: string;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface IEpisode {
  id: number;
  episode_number: number;
  name: string;
  season_number: number;
}
