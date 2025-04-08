
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '@/contexts/MovieContext';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

interface RecommendedMoviesProps {
  title: string;
  movies: Movie[];
  sourceMovieId?: string;
  visibleCount?: number;
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({ 
  title, 
  movies,
  sourceMovieId,
  visibleCount = 5 // Default to showing 5 movies at a time
}) => {
  const navigate = useNavigate();
  
  if (!movies.length) return null;
  
  // Filter out the source movie if it's in the recommendations
  const filteredMovies = sourceMovieId 
    ? movies.filter(movie => movie.id !== sourceMovieId)
    : movies;
  
  if (!filteredMovies.length) return null;
  
  return (
    <section className="py-2">
      {title && (
        <div className="container">
          <h2 className="text-xl font-bold mb-4 text-cineniche-dark-blue">{title}</h2>
        </div>
      )}
      
      <div className="relative px-4">
        <Carousel 
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1
          }}
          className="w-full"
        >
          <CarouselContent>
            {filteredMovies.map((movie) => (
              <CarouselItem key={movie.id} className="md:basis-1/5 basis-1/2">
                <div 
                  className="p-1 cursor-pointer" 
                  onClick={() => navigate(`/movies/${movie.id}`)}
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium line-clamp-1">{movie.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    {movie.releaseDate.split('-')[0]}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
};

export default RecommendedMovies;
