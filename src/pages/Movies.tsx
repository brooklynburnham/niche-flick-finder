
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MovieGrid from '@/components/movies/MovieGrid';
import GenreFilter from '@/components/movies/GenreFilter';
import Hero from '@/components/movies/Hero';
import { useMovies } from '@/contexts/MovieContext';
import { useAuth } from '@/contexts/AuthContext';

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

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Layout onSearch={handleSearch}>
      {/* Hero Banner with Featured Movie */}
      {featuredMovies.length > 0 && !filters.searchQuery && !filters.genre && (
        <Hero movie={featuredMovies[0]} />
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
          </div>
        )}
        
        {/* All Movies (default) */}
        {!filters.genre && !filters.searchQuery && (
          <h2 className="text-2xl font-bold mb-6">All Movies</h2>
        )}
        
        {/* Movie Grid */}
        <MovieGrid movies={filteredMovies} loading={loading} />
      </div>
    </Layout>
  );
};

export default Movies;
