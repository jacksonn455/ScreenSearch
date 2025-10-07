# 🎬 Movie Search App - Frontend

A modern movie search and favorites management application, built with Next.js 14+ and React, featuring a design inspired by streaming platforms like Netflix, HBO Max, and Amazon Prime.

## 📋 Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Components](#components)
- [Custom Hooks](#custom-hooks)
- [Styling](#styling)
- [API Integration](#api-integration)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Build and Deploy](#build-and-deploy)

## 🚀 Technologies Used

### Core
- **Next.js 14+** - React framework with App Router
- **React 18+** - JavaScript library for UI
- **TypeScript** - Typed superset of JavaScript

### State Management & Data Fetching
- **@tanstack/react-query** (v5) - Server-side state management and caching
- **Axios** - HTTP client for API requests

### Navigation
- **next/navigation** - Next.js 14 routing system
- **next/link** - Optimized page navigation

### Styling
- **CSS Modules** - Component-scoped styles
- **CSS Animations** - Custom animations and transitions
- **Glassmorphism** - Modern glass/blur effects

## 📦 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:3000`

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure environment variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run the project
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3001`

## 📁 Project Structure

```
frontend/
├── app/
│   ├── components/          
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── MovieCard.tsx
│   │   
│   ├── hooks/              
│   │   └── useFavorites.ts
│   ├── types/              
│   │   └── movie.ts
│   ├── styles/             
│   │   ├── search.module.css
│   │   ├── favorites.module.css
│   │   └── globals.css
│   ├── search/             
│   │   └── page.tsx
│   ├── favorites/          
│   │   └── page.tsx
│   ├── layout.tsx         
│   └── page.tsx            
├── public/                
├── .env.local            
├── next.config.js        
├── tsconfig.json         
└── package.json          
```

## ✨ Features

### 🔍 Movie Search
- Integrated search with OMDb API
- Modern interface with visual effects
- Responsive grid results
- Loading states and error handling

### ❤️ Favorites System
- Add/remove movies from favorites
- Real-time synchronization with backend
- Data persistence in MongoDB
- Intelligent caching with React Query

### 🎨 Modern Design
- Glassmorphism and backdrop blur
- Animated gradients
- Smooth transitions
- Responsive design (mobile-first)
- Support for prefers-reduced-motion
- Support for high contrast mode

## 🧩 Components

### Header
```tsx
// Main application navigation
<Header />
```
**Features:**
- Links to Search and Favorites
- Active page indicator
- Responsive design

### SearchBar
```tsx
// Search bar with validation
<SearchBar onSearch={(query) => handleSearch(query)} />
```
**Props:**
- `onSearch`: (query: string) => void

**Features:**
- Input validation
- Disabled state when empty
- Animated search icon
- Auto-complete disabled

### MovieCard
```tsx
// Movie card with favorites
<MovieCard movie={movieData} />
```
**Props:**
- `movie`: Movie object

**Features:**
- Image lazy loading
- Fallback for missing posters
- Integrated favorite button
- Hover effects
- Click handler for details

### TestFavorites (Debug)
```tsx
// Debug component to test API
<TestFavorites />
```
**Features:**
- Test adding favorites
- Test removing favorites
- Test API directly
- Show React Query state

## 🎣 Custom Hooks

### useFavorites
Hook to manage favorites with React Query.

```typescript
const {
  favorites,        // List of favorites
  isLoading,        // Loading state
  addFavorite,      // Mutation to add
  removeFavorite,   // Mutation to remove
  checkIsFavorite   // Check if it's a favorite
} = useFavorites();
```

**Usage example:**
```typescript
// Add favorite
await addFavorite.mutateAsync(movie);

// Remove favorite
await removeFavorite.mutateAsync(imdbID);

// Check if it's a favorite
const isFav = checkIsFavorite('tt0372784');
```

## 🎨 Styling

### CSS Modules
Each page/component has its own CSS Module file:

- `search.module.css` - Search page styles
- `favorites.module.css` - Favorites page styles
- `globals.css` - Global styles

### Class Naming Conventions
```css
.movie-card { }              /* Main component */
.movie-card:hover { }        /* Hover state */
.movie-card.favorited { }    /* Modifier */
```

### Available Animations
```css
@keyframes gradientShift { }  /* Animated gradient */
@keyframes spin { }           /* Loading spinner */
@keyframes heartBeat { }      /* Heart animation */
```

### Responsive Breakpoints
```css
@media (max-width: 768px) { } /* Tablet */
@media (max-width: 480px) { } /* Mobile */
```

## 🔌 API Integration

### Base URL
```typescript
const API_BASE_URL = 'http://localhost:3000';
```

### Endpoints Used

#### GET /favorites
```typescript
// Fetch all favorites
GET http://localhost:3000/favorites

Response: {
  success: boolean,
  data: Favorite[]
}
```

#### POST /favorites
```typescript
// Add favorite
POST http://localhost:3000/favorites
Body: {
  imdbID: string,
  title: string,
  year: string,
  poster: string
}

Response: {
  success: boolean,
  data: Favorite
}
```

#### DELETE /favorites/:imdbID
```typescript
// Remove favorite
DELETE http://localhost:3000/favorites/tt0372784

Response: {
  success: boolean,
  message: string
}
```

### TypeScript Types

```typescript
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface Favorite {
  _id: string;
  imdbID: string;
  title: string;
  year: string;
  poster?: string;
  createdAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Create production build
npm run start        # Start production server

# Lint
npm run lint         # Run ESLint

# Type Check
npm run type-check   # Check TypeScript types
```

## 🔐 Environment Variables

Create a `.env.local` file:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000

# OMDb API (if needed)
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the client.

## 🚀 Build and Deploy

### Local Build
```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy Configuration
1. Configure environment variables in Vercel dashboard
2. Connect GitHub repository
3. Automatic deployment on each push

### Production Environment Variables
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## 🐛 Debug and Troubleshooting

### Issue: Favorites not updating
**Solution:**
1. Check if backend is running
2. Open DevTools (F12) and check logs
3. Use `<TestFavorites />` component for debugging
4. Check Network tab

### Issue: CORS Error
**Solution:**
Configure CORS on backend:
```javascript
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
```

### Issue: Images not loading
**Solution:**
Configure `next.config.js`:
```javascript
module.exports = {
  images: {
    domains: ['m.media-amazon.com'],
  },
}
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Modules Guide](https://github.com/css-modules/css-modules)

## 🤝 Contributing

1. Fork the project
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

## Author

<img src="https://avatars1.githubusercontent.com/u/46221221?s=460&u=0d161e390cdad66e925f3d52cece6c3e65a23eb2&v=4" width=115>  

<sub>@jacksonn455</sub>

---