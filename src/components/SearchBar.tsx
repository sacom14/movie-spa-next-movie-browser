// SearchBar component
"use client";

import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { searchMovie } from '../services/movie';
import { Movie, SearchBarProps } from '@/interfaces/movie';

const SearchBar = ({ onSearchResults }: SearchBarProps) => {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('q') || '';

    const [query, setQuery] = useState(queryParam);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownResults, setDropdownResults] = useState<Movie[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setQuery(queryParam);
    }, [queryParam]);

    const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery.length >= 1) {
            setIsLoading(true);
            setShowDropdown(true);
            try {
                const results = await searchMovie(newQuery);
                if (onSearchResults) {
                    onSearchResults(results);
                }
                setDropdownResults(results.slice(0, 5));
            } catch (error) {
                console.error("Error al obtener resultados de búsqueda:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            if (onSearchResults) {
                onSearchResults([]);
            }
            setDropdownResults([]);
            setShowDropdown(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(false);
        }
    };

    return (
        <form className="search-container" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder="Buscar película..."
                className="search-input"
            />
            {isLoading && <span> </span>}

            {query && dropdownResults.length > 0 && showDropdown && (
                <div className="search-dropdown">
                    {dropdownResults.map((movie) => (
                        <Link
                            key={movie.id}
                            href={`/movie/${movie.id}`}
                            onClick={() => setShowDropdown(false)}
                            className="search-dropdown-item"
                        >
                            {movie.title} {movie.release_date && `(${new Date(movie.release_date).getFullYear()})`}
                        </Link>
                    ))}
                </div>
            )}
        </form>
    );
};

export default SearchBar;