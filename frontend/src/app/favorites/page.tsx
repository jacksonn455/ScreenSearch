// frontend/app/favorites/page.tsx
'use client';

import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import styles from '../styles/favorites.module.css';

export default function FavoritesPage() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className={styles['favorites-container']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p className={styles['loading-text']}>Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['favorites-container']}>
      <div className={styles.container}>
        <h1 className={styles['favorites-title']}>❤️ My Favorite Movies</h1>
        
        {!favorites || favorites.length === 0 ? (
          <div className={styles['empty-state']}>
            <h3>No favorite movies yet!</h3>
            <p>Go to the search page and add some movies to your favorites.</p>
            <a href="/search" className={styles['btn-primary']}>
              Search Movies
            </a>
          </div>
        ) : (
          <>
            <p className={styles['favorites-subtitle']}>
              You have {favorites.length} favorite movie{favorites.length !== 1 ? 's' : ''}
            </p>
            <div className={styles['movies-grid']}>
              {favorites.map((favorite) => (
                <MovieCard
                  key={favorite._id}
                  movie={{
                    imdbID: favorite.imdbID,
                    Title: favorite.title,
                    Year: favorite.year,
                    Poster: favorite.poster || '',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}