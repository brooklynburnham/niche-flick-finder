
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
import useEmblaCarousel from 'embla-carousel-react';

interface FeaturedMoviesProps {
  title: string;
  movies: Movie[];
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ title, movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    skipSnaps: false,
    duration: 30
  });

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect);
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi, onSelect]);

  // Auto-rotation effect
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [emblaApi]);

  if (!movies.length) return null;
  
  // Limit to 10 movies for featured carousel
  const featuredMoviesToShow = movies.slice(0, 10);
  
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6 text-cineniche-dark-blue">{title}</h2>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {featuredMoviesToShow.map((movie) => (
                <div 
                  key={movie.id} 
                  className="min-w-0 flex-[0_0_100%] pl-0 transition-transform duration-500"
                >
                  <div className="p-1">
                    <MovieCard movie={movie} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-4 gap-2">
            {featuredMoviesToShow.map((_, index) => (
              <Button 
                key={index}
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0"
                onClick={() => scrollTo(index)}
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
          
          <CarouselPrevious 
            onClick={() => emblaApi?.scrollPrev()} 
            className="absolute left-0 top-1/2 -translate-y-1/2" 
          />
          <CarouselNext 
            onClick={() => emblaApi?.scrollNext()} 
            className="absolute right-0 top-1/2 -translate-y-1/2" 
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
