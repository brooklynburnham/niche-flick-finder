import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Movie, useMovies } from '@/contexts/MovieContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from '../hooks/useInView';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  pageSize?: number;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading = false,
  pageSize = 8 
}) => {
  const { getMoviesByPage } = useMovies();
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  
  // Initialize with first batch
  useEffect(() => {
    // If movies are explicitly provided, use those for initial display
    // This handles cases like featured movies, categories, etc
    if (movies.length > 0) {
      setDisplayedMovies(movies.slice(0, pageSize));
    } else {
      // Otherwise, fetch the first page from the context
      setDisplayedMovies(getMoviesByPage(1, pageSize));
    }
    setPage(1);
  }, [movies, pageSize, getMoviesByPage]);

  // Handle infinite scroll
  useEffect(() => {
    if (inView && !loading) {
      const nextPage = page + 1;
      
      if (movies.length > 0) {
        // If movies are provided directly, slice from that array
        const nextBatch = movies.slice(0, nextPage * pageSize);
        if (nextBatch.length > displayedMovies.length) {
          setDisplayedMovies(nextBatch);
          setPage(nextPage);
        }
      } else {
        // Otherwise fetch next page from context
        const nextBatch = getMoviesByPage(nextPage, pageSize);
        if (nextBatch.length > 0) {
          setDisplayedMovies(prev => [...prev, ...nextBatch]);
          setPage(nextPage);
        }
      }
    }
  }, [inView, loading, movies, page, pageSize, displayedMovies.length, getMoviesByPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: pageSize }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="aspect-[2/3] rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (displayedMovies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No movies found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  // Determine if we should show the loading indicator
  const hasMoreToLoad = movies.length > 0 
    ? displayedMovies.length < movies.length 
    : true; // When using context pagination, we assume there might be more until proven otherwise

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {hasMoreToLoad && (
        <div ref={ref} className="h-24 flex items-center justify-center mt-8">
          <div className="h-10 w-10 rounded-full border-4 border-cineniche-purple border-t-transparent animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default MovieGrid;
