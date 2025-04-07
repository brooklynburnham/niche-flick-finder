
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Film, User, ChevronLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useMovies } from '@/contexts/MovieContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById, rateMovie, loading } = useMovies();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState<number | null>(null);
  
  const movie = id ? getMovieById(id) : undefined;
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Handle rating submission
  const handleRateMovie = () => {
    if (id && userRating !== null) {
      rateMovie(id, userRating);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-cineniche-purple border-t-transparent animate-spin"></div>
        </div>
      </Layout>
    );
  }
  
  if (!movie) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-muted-foreground mb-8">The movie you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/movies')}>
            Back to Movies
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0">
          <img 
            src={movie.bannerUrl || movie.posterUrl} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      </div>
      
      <div className="container -mt-40 md:-mt-64 relative z-10 pb-12">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/movies')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Movie Poster */}
          <div className="md:col-span-3">
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
              <img 
                src={movie.posterUrl} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Movie Details */}
          <div className="md:col-span-9">
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>{movie.releaseDate.split('-')[0]}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">{movie.contentRating}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1.5" />
                <span>{movie.userRating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map((genre) => (
                <span 
                  key={genre} 
                  className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs md:text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                <p className="text-muted-foreground">{movie.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Director</h2>
                  <div className="flex items-center">
                    <Film className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{movie.director}</span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Cast</h2>
                  <div className="space-y-1">
                    {movie.cast.map((actor) => (
                      <div key={actor} className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{actor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Rate this Movie</h2>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setUserRating(rating)}
                      className="p-1"
                    >
                      <Star 
                        className={`h-8 w-8 ${
                          userRating !== null && rating <= userRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  ))}
                  <Button 
                    onClick={handleRateMovie}
                    disabled={userRating === null}
                    className="ml-4"
                  >
                    Submit Rating
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetail;
