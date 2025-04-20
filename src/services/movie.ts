import { MovieDetails, MoviesResponse } from "@/interfaces/movie";
import axios from "axios";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_THE_MOVIE_DB_ACCESS_TOKEN;

const ThemeMovieDbService = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
    params: {
        language: 'es-ES',
    }
});

export const getPopularMovies = async (): Promise<MoviesResponse['results']> => {
    const response = await ThemeMovieDbService.get<MoviesResponse>('/movie/popular');
    return response.data.results;
};

export const getMovieDetails = async (id: string | number): Promise<MovieDetails> => {
    const response = await ThemeMovieDbService.get(`/movie/${id}`);
    return response.data;
};

export const searchMovie = async (query: string): Promise<MoviesResponse['results']> => {
    const response = await ThemeMovieDbService.get('/search/movie', {
        params: { query }
    });
    return response.data.results;
};

export const getSimilarMovies = async (id: string | number): Promise<MoviesResponse['results']> => {
    const response = await ThemeMovieDbService.get<MoviesResponse>(`/movie/${id}/similar`);
    return response.data.results.slice(0, 6);
};