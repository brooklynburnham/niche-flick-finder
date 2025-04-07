
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MovieListItem from '@/components/admin/MovieListItem';
import MovieForm from '@/components/admin/MovieForm';
import { useMovies, Movie } from '@/contexts/MovieContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Admin = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { movies, filteredMovies, filters, setFilters, addMovie, updateMovie, deleteMovie } = useMovies();
  const navigate = useNavigate();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/movies');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, searchQuery });
  };
  
  // Handle edit movie
  const handleEditMovie = (movie: Movie) => {
    setCurrentMovie(movie);
    setShowEditForm(true);
  };
  
  // Handle delete movie
  const handleDeleteClick = (movie: Movie) => {
    setCurrentMovie(movie);
    setShowDeleteDialog(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (currentMovie) {
      deleteMovie(currentMovie.id);
      setShowDeleteDialog(false);
      setCurrentMovie(null);
    }
  };
  
  // Handle add movie
  const handleAddMovie = (movieData: Omit<Movie, 'id'>) => {
    addMovie(movieData);
    setShowAddForm(false);
  };
  
  // Handle update movie
  const handleUpdateMovie = (movieData: Partial<Movie>) => {
    if (currentMovie) {
      updateMovie(currentMovie.id, movieData);
      setShowEditForm(false);
      setCurrentMovie(null);
    }
  };
  
  // If not authenticated or not admin, don't render anything
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your movie catalog</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add New Movie
          </Button>
        </div>
        
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="stats" disabled>Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="movies" className="space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md">
              <Input
                type="search"
                placeholder="Search movies..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Button 
                type="submit" 
                className="absolute right-1 top-1 h-8 px-3"
                variant="ghost"
              >
                Search
              </Button>
            </form>
            
            {/* Movies List */}
            <div className="border rounded-lg">
              {filteredMovies.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No movies found</p>
                </div>
              ) : (
                filteredMovies.map((movie) => (
                  <MovieListItem
                    key={movie.id}
                    movie={movie}
                    onEdit={() => handleEditMovie(movie)}
                    onDelete={() => handleDeleteClick(movie)}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Movie Form Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Movie</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new movie to the catalog
            </DialogDescription>
          </DialogHeader>
          <MovieForm
            onSubmit={handleAddMovie}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Movie Form Dialog */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Movie</DialogTitle>
            <DialogDescription>
              Update the movie details
            </DialogDescription>
          </DialogHeader>
          {currentMovie && (
            <MovieForm
              movie={currentMovie}
              onSubmit={handleUpdateMovie}
              onCancel={() => setShowEditForm(false)}
              isEditing
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentMovie?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
