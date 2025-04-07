import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Movie } from "@/contexts/MovieContext";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, className }) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className={cn("movie-card block", className)}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="movie-card-content">
          <h3 className="font-medium text-base md:text-lg mb-1 text-balance">
            {movie.title}
          </h3>
          <div className="flex items-center text-xs md:text-sm text-gray-300">
            <span>{movie.releaseDate.split("-")[0]}</span>
            <span className="mx-2">•</span>
            <span>{movie.contentRating}</span>
            {movie.userRating > 0 && (
              <>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{movie.userRating.toFixed(1)}</span>
                </div>
              </>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="inline-flex items-center rounded-full bg-cineniche-blue/20 px-2 py-0.5 text-xs font-medium text-cineniche-light-blue">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
