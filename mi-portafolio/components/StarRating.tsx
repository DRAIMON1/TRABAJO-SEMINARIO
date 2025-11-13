import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

type Props = {
  rating: number | null | undefined;
};

// Componente simple para mostrar estrellas
export default function StarRating({ rating }: Props) {
  const totalStars = 5;
  const roundedRating = Math.round(rating || 0);

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={starValue}>
            {starValue <= roundedRating ? (
              <StarSolid className="h-5 w-5 text-yellow-500" />
            ) : (
              <StarOutline className="h-5 w-5 text-yellow-500" />
            )}
          </span>
        );
      })}
    </div>
  );
}