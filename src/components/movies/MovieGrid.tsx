
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/contexts/MovieContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from '../hooks/useInView';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading = false }) => {
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const moviesPerPage = 8;

  // Initialize with first batch
  useEffect(() => {
    setDisplayedMovies(movies.slice(0, moviesPerPage));
    setPage(1);
  }, [movies]);

  // Handle infinite scroll
  useEffect(() => {
    if (inView && !loading && displayedMovies.length < movies.length) {
      const nextPage = page + 1;
      const nextMovies = movies.slice(0, nextPage * moviesPerPage);
      
      setDisplayedMovies(nextMovies);
      setPage(nextPage);
    }
  }, [inView, loading, movies, page, displayedMovies.length]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="aspect-[2/3] rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No movies found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {displayedMovies.length < movies.length && (
        <div ref={ref} className="h-24 flex items-center justify-center mt-8">
          <div className="h-10 w-10 rounded-full border-4 border-cineniche-purple border-t-transparent animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default MovieGrid;
