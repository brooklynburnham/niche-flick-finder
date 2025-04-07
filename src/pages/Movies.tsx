import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MovieGrid from "@/components/movies/MovieGrid";
import GenreFilter from "@/components/movies/GenreFilter";
import Hero from "@/components/movies/Hero";
import FeaturedMovies from "@/components/movies/FeaturedMovies";
import { useMovies, Movie } from "@/contexts/MovieContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import RecommendedMovies from "@/components/movies/RecommendedMovies";

const Movies = () => {
  const { isAuthenticated } = useAuth();
  const {
    movies,
    filteredMovies,
    loading,
    filters,
    setFilters,
    featuredMovies,
  } = useMovies();
  const navigate = useNavigate();
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  // Auto-rotate featured movies every 10 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) =>
        prevIndex === featuredMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [featuredMovies.length]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Extract all unique genres from movies
  const allGenres = movies
    .reduce<string[]>((genres, movie) => {
      movie.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
      return genres;
    }, [])
    .sort();

  // Handle search from navbar
  const handleSearch = (query: string) => {
    setFilters({ ...filters, searchQuery: query });
  };

  // Handle genre filter
  const handleGenreFilter = (genre: string | undefined) => {
    setFilters({ ...filters, genre });
  };

  // Generate movie categories
  const getMoviesByCategory = () => {
    // Popular movies (high rating)
    const popularMovies = [...movies]
      .filter((movie) => movie.userRating >= 4)
      .sort((a, b) => b.userRating - a.userRating)
      .slice(0, 10);

    // Recent releases
    const recentReleases = [...movies]
      .sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )
      .slice(0, 10);

    // Action movies
    const actionMovies = movies
      .filter((movie) => movie.genres.includes("Action"))
      .slice(0, 10);

    // Comedy movies
    const comedyMovies = movies
      .filter((movie) => movie.genres.includes("Comedy"))
      .slice(0, 10);

    // Drama movies
    const dramaMovies = movies
      .filter((movie) => movie.genres.includes("Drama"))
      .slice(0, 10);

    return {
      popularMovies,
      recentReleases,
      actionMovies,
      comedyMovies,
      dramaMovies,
    };
  };

  // Get all category movies
  const categories = getMoviesByCategory();

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Layout onSearch={handleSearch}>
      {/* Auto-Rotating Featured Movie */}
      {featuredMovies.length > 0 && !filters.searchQuery && !filters.genre && (
        <div className="bg-cineniche-dark-blue py-6">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Featured Movies
            </h2>
            {featuredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className={`transition-opacity duration-1000 ${
                  currentFeaturedIndex === index ? "opacity-100" : "hidden"
                }`}>
                <Hero movie={movie} />
              </div>
            ))}
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
              Found {filteredMovies.length}{" "}
              {filteredMovies.length === 1 ? "movie" : "movies"}
            </p>
            <MovieGrid movies={filteredMovies} loading={loading} />
          </div>
        )}

        {/* Genre Results Display */}
        {filters.genre && !filters.searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{filters.genre} Movies</h2>
            <p className="text-muted-foreground">
              Found {filteredMovies.length}{" "}
              {filteredMovies.length === 1 ? "movie" : "movies"}
            </p>
            <MovieGrid movies={filteredMovies} loading={loading} />
          </div>
        )}

        {/* Category Sections - Only show when no filters active */}
        {!filters.genre && !filters.searchQuery && (
          <>
            {/* Popular Movies Section */}
            {categories.popularMovies.length > 0 && (
              <FeaturedMovies
                title="Popular Movies"
                movies={categories.popularMovies}
              />
            )}

            {/* Recent Releases Section */}
            {categories.recentReleases.length > 0 && (
              <FeaturedMovies
                title="Recent Releases"
                movies={categories.recentReleases}
              />
            )}

            {/* Action Movies */}
            {categories.actionMovies.length > 0 && (
              <FeaturedMovies title="Action" movies={categories.actionMovies} />
            )}

            {/* Comedy Movies */}
            {categories.comedyMovies.length > 0 && (
              <FeaturedMovies title="Comedy" movies={categories.comedyMovies} />
            )}

            {/* Drama Movies */}
            {categories.dramaMovies.length > 0 && (
              <FeaturedMovies title="Drama" movies={categories.dramaMovies} />
            )}

            {/* All Movies Section */}
            <h2 className="text-2xl font-bold mt-8 mb-6">All Movies</h2>
            <MovieGrid movies={filteredMovies} loading={loading} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Movies;
