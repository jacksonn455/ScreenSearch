// frontend/components/FavoriteButton.tsx
'use client';

import { Movie } from '../types/movie';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  movie: Movie;
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, checkIsFavorite } = useFavorites();
  
  const isFavorite = checkIsFavorite(movie.imdbID);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite.mutate(movie.imdbID);
    } else {
      addFavorite.mutate(movie);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={addFavorite.isPending || removeFavorite.isPending}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        isFavorite
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {addFavorite.isPending || removeFavorite.isPending ? (
        '...'
      ) : isFavorite ? (
        '❤️ Remove from Favorites'
      ) : (
        '🤍 Add to Favorites'
      )}
    </button>
  );
}