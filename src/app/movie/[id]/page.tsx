import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import { getMovieDetails, getSimilarMovies } from '@/services/movie';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { id } = await props.params;
    const movie = await getMovieDetails(id);
    return {
        title: `${movie.title} | Movie Browser`,
        description: movie.overview,
    };
}

export default async function MovieDetailsPage(props: Props) {
    const { id } = await props.params;
    const movie = await getMovieDetails(id);
    const similarMovies = await getSimilarMovies(id);

    return (
        <div className="container">
            <Link href="/" className="back-button">Volver a inicio</Link>

            <div className="movie-details-container">
                <div className="relative" style={{ width: '300px', height: '450px', alignSelf: 'center' }}>
                    <Image
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png'}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover movie-details-poster"
                        priority
                    />
                </div>

                <div className="movie-details-info">
                    <h1 className="movie-details-title">{movie.title}</h1>
                    {movie.tagline && (
                        <p className="movie-details-tagline">&quot;{movie.tagline}&quot;</p>
                    )}

                    <div className="movie-details-stats">
                        {movie.release_date && (
                            <span className="movie-details-stat">
                                {new Date(movie.release_date).getFullYear()}
                            </span>
                        )}
                        <span className="movie-details-stat">{movie.runtime} min</span>
                        <span className="movie-details-stat">
                            ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                    </div>

                    <p className="movie-details-overview">{movie.overview}</p>

                    <div className="movie-details-row">
                        <span className="movie-details-label">Géneros:</span>
                        {movie.genres.map((genre) => genre.name).join(", ")}
                    </div>

                    <div className="movie-details-row">
                        <span className="movie-details-label">Idioma original:</span>
                        {movie.original_language}
                    </div>

                    <div className="movie-details-row">
                        <span className="movie-details-label">Países:</span>
                        {movie.production_countries.map((country) => country.name).join(", ")}
                    </div>

                    {movie.homepage && (
                        <div className="movie-details-row">
                            <span className="movie-details-label">Sitio oficial:</span>
                            <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="movie-details-link">
                                Visitar
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Similar Movies Section */}
            {similarMovies.length > 0 && (
                <div className="similar-movies-section">
                    <h2 className="similar-movies-title">También te podría interesar</h2>
                    <div className="similar-movies-grid">
                        {similarMovies.map((similarMovie) => (
                            <MovieCard key={similarMovie.id} movie={similarMovie} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}