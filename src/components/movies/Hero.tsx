
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
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={movie.bannerUrl || movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cineniche-dark-blue/90 via-cineniche-dark-blue/70 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {movie.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-300">
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
            {movie.genres.slice(0, 3).map((genre) => (
              <span 
                key={genre} 
                className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white"
              >
                {genre}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="sm" className="gap-2 bg-cineniche-blue hover:bg-cineniche-blue/90">
              <Play className="h-4 w-4" />
              Watch
            </Button>
            <Link to={`/movies/${movie.id}`}>
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
