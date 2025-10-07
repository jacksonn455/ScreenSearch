// frontend/app/components/SearchBar.tsx
"use client";

import { useState } from 'react';
import styles from '../styles/search.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['search-bar']}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className={styles['search-input']}
          autoComplete="off"
        />
        <span className={styles['search-icon']}>🔍</span>
        <button
          type="submit"
          className={styles['search-button']}
          disabled={!query.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
}