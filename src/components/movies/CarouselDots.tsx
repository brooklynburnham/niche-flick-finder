
import React from 'react';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';

interface CarouselDotsProps {
  count: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  count,
  currentIndex,
  onDotClick,
}) => {
  return (
    <div className="flex justify-center mt-4 gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => onDotClick(index)}
        >
          {index === currentIndex ? (
            <Circle className="h-3 w-3 fill-cineniche-purple text-cineniche-purple" />
          ) : (
            <Circle className="h-3 w-3" />
          )}
          <span className="sr-only">Go to slide {index + 1}</span>
        </Button>
      ))}
    </div>
  );
};

export default CarouselDots;
