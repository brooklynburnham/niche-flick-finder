
import React from 'react';
import { Movie } from '@/contexts/MovieContext';
import { Button } from '@/components/ui/button';
import { Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface HeroProps {
  movie: Movie;
}

const Hero: React.FC<HeroProps> = ({ movie }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={movie.bannerUrl || movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container relative h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {movie.title}
          </h1>
          
          <div className="flex items-center text-sm md:text-base text-gray-300">
            <span>{movie.releaseDate.split('-')[0]}</span>
            <span className="mx-2">•</span>
            <span>{movie.contentRating}</span>
            <span className="mx-2">•</span>
            <span>{movie.duration}</span>
            {movie.userRating > 0 && (
              <>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{movie.userRating.toFixed(1)}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span 
                key={genre} 
                className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs md:text-sm font-medium text-white"
              >
                {genre}
              </span>
            ))}
          </div>
          
          <p className="text-sm md:text-base text-gray-300 max-w-xl">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Watch Now
            </Button>
            <Link to={`/movies/${movie.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
