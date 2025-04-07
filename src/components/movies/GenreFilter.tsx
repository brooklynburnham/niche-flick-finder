
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | undefined;
  onSelectGenre: (genre: string | undefined) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ 
  genres, 
  selectedGenre, 
  onSelectGenre 
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">Genres</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 pb-1">
          <Badge
            key="all"
            variant={!selectedGenre ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => onSelectGenre(undefined)}
          >
            All Genres
          </Badge>
          
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => onSelectGenre(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default GenreFilter;
