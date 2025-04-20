import Link from "next/link";
import Image from "next/image";
import { MovieCardProps } from "@/interfaces/movie";

const MovieCard = ({ movie }: MovieCardProps) => {
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "/placeholder.png";

    return (
        <Link href={`/movie/${movie.id}`} className="movie-card">
            <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
                <Image
                    src={imageUrl}  
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
            </div>
            <div className="movie-card-content">
                <div className="movie-title">{movie.title}</div>
                {releaseYear && <div className="movie-year">({releaseYear})</div>}
            </div>
        </Link>
    );
};

export default MovieCard;