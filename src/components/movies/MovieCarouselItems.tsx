
import React from 'react';
import { Movie } from '@/contexts/MovieContext';
import MovieCard from './MovieCard';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface MovieCarouselItemsProps {
  movies: Movie[];
}

const MovieCarouselItems: React.FC<MovieCarouselItemsProps> = ({ movies }) => {
  return (
    <CarouselContent>
      {movies.map((movie) => (
        <CarouselItem key={movie.id} className="basis-full">
          <div className="p-1">
            <MovieCard movie={movie} />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export default MovieCarouselItems;
