
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MovieGrid from '@/components/movies/MovieGrid';
import GenreFilter from '@/components/movies/GenreFilter';
import Hero from '@/components/movies/Hero';
import FeaturedMovies from '@/components/movies/FeaturedMovies';
import { useMovies } from '@/contexts/MovieContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from '@/components/ui/carousel';

const Movies = () => {
  const { isAuthenticated } = useAuth();
  const { movies, filteredMovies, loading, filters, setFilters, featuredMovies } = useMovies();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Extract all unique genres from movies
  const allGenres = movies.reduce<string[]>((genres, movie) => {
    movie.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
    return genres;
  }, []).sort();

  // Handle search from navbar
  const handleSearch = (query: string) => {
    setFilters({ ...filters, searchQuery: query });
  };

  // Handle genre filter
  const handleGenreFilter = (genre: string | undefined) => {
    setFilters({ ...filters, genre });
  };

  // Generate movie categories
  const getPopularMovies = () => {
    return movies
      .filter(movie => movie.userRating >= 4)
      .sort((a, b) => b.userRating - a.userRating)
      .slice(0, 10);
  };

  const getRecentMovies = () => {
    return [...movies]
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      .slice(0, 10);
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Layout onSearch={handleSearch}>
      {/* Top Featured Movies Carousel */}
      {featuredMovies.length > 0 && !filters.searchQuery && !filters.genre && (
        <div className="bg-cineniche-dark-blue py-6">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6 text-white">Featured Movies</h2>
            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredMovies.map((movie) => (
                  <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Hero movie={movie} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      )}

      <div className="container py-8">
        {/* Genre Filter */}
        <GenreFilter 
          genres={allGenres} 
          selectedGenre={filters.genre}
          onSelectGenre={handleGenreFilter}
        />
        
        {/* Search Results Display */}
        {filters.searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Search Results for "{filters.searchQuery}"
            </h2>
            <p className="text-muted-foreground">
              Found {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
            </p>
            <MovieGrid movies={filteredMovies} loading={loading} />
          </div>
        )}
        
        {/* Genre Results Display */}
        {filters.genre && !filters.searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {filters.genre} Movies
            </h2>
            <p className="text-muted-foreground">
              Found {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
            </p>
            <MovieGrid movies={filteredMovies} loading={loading} />
          </div>
        )}
        
        {/* Category Sections - Only show when no filters active */}
        {!filters.genre && !filters.searchQuery && (
          <>
            {/* Popular Movies Section */}
            <FeaturedMovies title="Popular Movies" movies={getPopularMovies()} />
            
            {/* Recent Releases Section */}
            <FeaturedMovies title="Recent Releases" movies={getRecentMovies()} />
            
            {/* All Movies Section */}
            <h2 className="text-2xl font-bold mb-6">All Movies</h2>
            <MovieGrid movies={filteredMovies} loading={loading} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Movies;
