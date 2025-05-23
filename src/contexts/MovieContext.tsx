
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Types
export interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  genres: string[];
  contentRating: string;
  userRating: number;
  posterUrl: string;
  bannerUrl?: string;
  description: string;
  duration: string;
  director: string;
  cast: string[];
  featured?: boolean;
}

export interface MovieFilter {
  genre?: string;
  searchQuery?: string;
}

// API function to get movie recommendations (this is a placeholder, the actual implementation is in MovieDetail.tsx)
export const getMovieRecommendations = async (id: string): Promise<Movie[]> => {
  const API_BASE_URL = "/api/movies"; // Replace with your actual API base URL
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/recommendations`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    // Return an empty array as fallback
    return [];
  }
};

interface MovieContextType {
  movies: Movie[];
  featuredMovies: Movie[];
  loading: boolean;
  filteredMovies: Movie[];
  filters: MovieFilter;
  setFilters: (filters: MovieFilter) => void;
  getMovieById: (id: string) => Movie | undefined;
  rateMovie: (id: string, rating: number) => void;
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  getRecommendedMoviesById: (id: string) => Movie[];
  getMoviesByPage: (page: number, pageSize: number) => Movie[];
  totalMoviesCount: number;
}

// Mock data (in a real app, this would be fetched from the API)
import mockMovies from '../data/mockMovies';

// Mock recommendation data structure that would come from SQLite
const mockRecommendations: Record<string, string[]> = {};

// Generate mock recommendations for each movie
mockMovies.forEach(movie => {
  // Get 10 random different movies as recommendations
  const recommendations = mockMovies
    .filter(m => m.id !== movie.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 10)
    .map(m => m.id);
  
  mockRecommendations[movie.id] = recommendations;
});

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MovieFilter>({});
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, string[]>>(mockRecommendations);

  // Load mock data initially
  useEffect(() => {
    // Simulate API delay
    const fetchMovies = async () => {
      setLoading(true);
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMovies(mockMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  // Apply filters when movies or filters change
  useEffect(() => {
    let result = [...movies];
    
    if (filters.genre) {
      result = result.filter(movie => 
        movie.genres.some(genre => 
          genre.toLowerCase().includes(filters.genre!.toLowerCase())
        )
      );
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.director.toLowerCase().includes(query) ||
        movie.cast.some(actor => actor.toLowerCase().includes(query))
      );
    }
    
    setFilteredMovies(result);
  }, [movies, filters]);

  // Get featured movies
  const featuredMovies = movies.filter(movie => movie.featured);

  // Get a movie by ID
  const getMovieById = (id: string) => {
    return movies.find(movie => movie.id === id);
  };

  // Get movies by page
  const getMoviesByPage = (page: number, pageSize: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredMovies.slice(startIndex, endIndex);
  };

  // Get recommended movies based on movie ID
  // This function now exists as a placeholder - the actual implementation uses the API function
  const getRecommendedMoviesById = (id: string) => {
    const recommendationIds = recommendations[id] || [];
    const recommendedMovies = recommendationIds
      .map(recId => movies.find(movie => movie.id === recId))
      .filter((movie): movie is Movie => movie !== undefined);
    
    return recommendedMovies;
  };

  // Rate a movie
  const rateMovie = (id: string, rating: number) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === id ? { ...movie, userRating: rating } : movie
      )
    );
    toast.success('Rating submitted successfully!');
  };

  // Add a new movie
  const addMovie = (movie: Omit<Movie, 'id'>) => {
    const newMovie = {
      ...movie,
      id: Date.now().toString(),
    };
    
    setMovies(prevMovies => [...prevMovies, newMovie]);
    toast.success(`Movie "${movie.title}" added successfully!`);
  };

  // Update a movie
  const updateMovie = (id: string, updates: Partial<Movie>) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === id ? { ...movie, ...updates } : movie
      )
    );
    toast.success('Movie updated successfully!');
  };

  // Delete a movie
  const deleteMovie = (id: string) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
    toast.success('Movie deleted successfully!');
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        featuredMovies,
        loading,
        filteredMovies,
        filters,
        setFilters,
        getMovieById,
        rateMovie,
        addMovie,
        updateMovie,
        deleteMovie,
        getRecommendedMoviesById,
        getMoviesByPage,
        totalMoviesCount: filteredMovies.length,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the movie context
export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
