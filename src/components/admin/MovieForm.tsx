
import React, { useState, useEffect } from 'react';
import { Movie } from '@/contexts/MovieContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Common genre options
const genreOptions = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 
  'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 
  'Thriller', 'War', 'Western', 'Family', 'Musical', 'Biography'
];

// Common content ratings
const contentRatingOptions = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR'];

interface MovieFormProps {
  movie?: Movie;
  onSubmit: (movieData: Omit<Movie, 'id'> | Partial<Movie>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const MovieForm: React.FC<MovieFormProps> = ({ 
  movie, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState<Omit<Movie, 'id'> | Partial<Movie>>({
    title: '',
    releaseDate: '',
    genres: [],
    contentRating: '',
    userRating: 0,
    posterUrl: '',
    bannerUrl: '',
    description: '',
    duration: '',
    director: '',
    cast: [],
    featured: false
  });
  
  const [genreInput, setGenreInput] = useState('');
  const [castInput, setCastInput] = useState('');
  
  // Initialize form with movie data if editing
  useEffect(() => {
    if (movie && isEditing) {
      setFormData(movie);
    }
  }, [movie, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !formData.genres?.includes(genreInput.trim())) {
      setFormData({
        ...formData,
        genres: [...(formData.genres || []), genreInput.trim()]
      });
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (genre: string) => {
    setFormData({
      ...formData,
      genres: formData.genres?.filter(g => g !== genre) || []
    });
  };

  const handleAddCastMember = () => {
    if (castInput.trim() && !formData.cast?.includes(castInput.trim())) {
      setFormData({
        ...formData,
        cast: [...(formData.cast || []), castInput.trim()]
      });
      setCastInput('');
    }
  };

  const handleRemoveCastMember = (actor: string) => {
    setFormData({
      ...formData,
      cast: formData.cast?.filter(a => a !== actor) || []
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Movie' : 'Add New Movie'}</CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Update the movie details below' 
            : 'Fill in the details to add a new movie to the catalog'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="Movie title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input
                id="releaseDate"
                name="releaseDate"
                type="date"
                value={formData.releaseDate || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contentRating">Content Rating</Label>
              <div className="flex gap-2">
                <select
                  id="contentRating"
                  name="contentRating"
                  value={formData.contentRating || ''}
                  onChange={(e) => setFormData({ ...formData, contentRating: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select Rating</option>
                  {contentRatingOptions.map(rating => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration || ''}
                onChange={handleInputChange}
                placeholder="e.g. 2h 15m"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              placeholder="Movie description"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="posterUrl">Poster URL</Label>
              <Input
                id="posterUrl"
                name="posterUrl"
                value={formData.posterUrl || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/poster.jpg"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bannerUrl">Banner URL (optional)</Label>
              <Input
                id="bannerUrl"
                name="bannerUrl"
                value={formData.bannerUrl || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/banner.jpg"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="director">Director</Label>
            <Input
              id="director"
              name="director"
              value={formData.director || ''}
              onChange={handleInputChange}
              placeholder="Director name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Genres</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.genres?.map(genre => (
                <div 
                  key={genre} 
                  className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-sm flex items-center gap-1"
                >
                  {genre}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveGenre(genre)}
                    className="text-muted-foreground hover:text-foreground ml-1 h-4 w-4 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select or type a genre</option>
                {genreOptions.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddGenre}
              >
                Add
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Cast</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.cast?.map(actor => (
                <div 
                  key={actor} 
                  className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-sm flex items-center gap-1"
                >
                  {actor}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveCastMember(actor)}
                    className="text-muted-foreground hover:text-foreground ml-1 h-4 w-4 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={castInput}
                onChange={(e) => setCastInput(e.target.value)}
                placeholder="Actor name"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddCastMember}
              >
                Add
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="featured" className="text-sm font-medium">
              Feature this movie on the homepage
            </Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {isEditing ? 'Update Movie' : 'Add Movie'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieForm;
