
import React from 'react';
import { Movie } from '@/contexts/MovieContext';
import MovieCard from './MovieCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface FeaturedMoviesProps {
  title: string;
  movies: Movie[];
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ title, movies }) => {
  if (!movies.length) return null;
  
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6 text-cineniche-dark-blue">{title}</h2>
        
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {movies.map((movie) => (
              <div key={movie.id} className="w-[200px] sm:w-[220px] flex-none">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default FeaturedMovies;
