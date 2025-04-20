"use client";

import { Suspense, useEffect, useState } from 'react';
import { getPopularMovies } from '@/services/movie';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import { Movie } from '@/interfaces/movie';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const movies = await getPopularMovies();
        setPopularMovies(movies);
      } catch (error) {
        console.error("Error loading popular movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearchResults = (results: Movie[]) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
  };

  const moviesToDisplay = isSearching ? searchResults : popularMovies;
  const pageTitle = isSearching ? "Resultados de búsqueda" : "Películas Populares";

  return (
    <>
      <div className='logo-container'>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={250}
          height={250}
          priority
        />
      </div>

      <div className="container">
        <h1>{pageTitle}</h1>

        <Suspense fallback={<p>···</p>}>
          <SearchBar onSearchResults={handleSearchResults} />
        </Suspense>

        {loading ? (
          <p>Cargando películas...</p>
        ) : (
          <>
            {isSearching && searchResults.length === 0 ? (
              <p>No se encontraron resultados para tu búsqueda.</p>
            ) : (
              <div className="movie-grid">
                {moviesToDisplay.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}