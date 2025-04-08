
import React, { useEffect, useState, useCallback } from 'react';
import { Movie } from '@/contexts/MovieContext';
import MovieCard from './MovieCard';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';

interface FeaturedMoviesProps {
  title: string;
  movies: Movie[];
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ title, movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  // Effect for auto-rotation
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [api]);

  // Update current index when carousel changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (!movies.length) return null;
  
  // Limit to 10 movies for featured carousel
  const featuredMoviesToShow = movies.slice(0, 10);
  
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6 text-cineniche-dark-blue">{title}</h2>
        
        <div className="relative">
          <Carousel
            opts={{
              loop: true,
              align: "start",
              skipSnaps: false,
              duration: 30
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {featuredMoviesToShow.map((movie) => (
                <CarouselItem key={movie.id} className="basis-full">
                  <div className="p-1">
                    <MovieCard movie={movie} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-4 gap-2">
            {featuredMoviesToShow.map((_, index) => (
              <Button 
                key={index}
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0"
                onClick={() => api?.scrollTo(index)}
              >
                {index === currentIndex ? (
                  <Circle className="h-3 w-3 fill-cineniche-purple text-cineniche-purple" />
                ) : (
                  <Circle className="h-3 w-3" />
                )}
                <span className="sr-only">Go to slide {index + 1}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
