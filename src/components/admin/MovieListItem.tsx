
import React from 'react';
import { Movie } from '@/contexts/MovieContext';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Star } from 'lucide-react';

interface MovieListItemProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-0">
      <div className="flex items-center space-x-4">
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className="h-16 w-12 object-cover rounded"
        />
        <div>
          <h3 className="font-medium">{movie.title}</h3>
          <div className="text-sm text-muted-foreground">
            <span>{movie.releaseDate.split('-')[0]}</span>
            <span className="mx-1">•</span>
            <span>{movie.genres.join(', ')}</span>
            {movie.featured && (
              <>
                <span className="mx-1">•</span>
                <span className="text-cineniche-purple">Featured</span>
              </>
            )}
          </div>
          <div className="flex items-center text-sm mt-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{movie.userRating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onEdit(movie)}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(movie.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default MovieListItem;
