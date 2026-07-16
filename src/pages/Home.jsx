import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Search, Star, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import MovieCard from '../components/MovieCard';
import RatingStars from '../components/RatingStars';
import moviesData from '../data/movies.json';
import { hasApiKey, searchMovies, getPopularMovies } from '../services/tmdbApi';

const GENRES = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Animation", "Crime"];

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  // Handle scrollTo parameter from navbar navigation
  useEffect(() => {
    if (loading) return;
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get('scrollTo');
    if (scrollTarget) {
      // Small delay to ensure the DOM is rendered
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      // Clean up the URL
      window.history.replaceState({}, '', '/');
    }
  }, [location.search, loading]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      // Try TMDB API first
      if (hasApiKey()) {
        const apiMovies = await getPopularMovies();
        if (apiMovies) {
          setMovies(apiMovies);
          setLoading(false);
          return;
        }
      }
      // Fallback to local data
      setTimeout(() => {
        setMovies(moviesData);
        setLoading(false);
      }, 400);
    };
    fetchMovies();
  }, []);

  // Handle live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      if (hasApiKey()) {
        const results = await searchMovies(searchQuery);
        if (results) {
          setSearchResults(results);
          setSearching(false);
          return;
        }
      }
      // Fallback: local search
      const local = moviesData.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(local);
      setSearching(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredMovies = useMemo(() => {
    const source = searchResults || movies;
    if (activeGenre === "All") return source;
    return source.filter(m => m.genre === activeGenre);
  }, [movies, searchResults, activeGenre]);

  const topRated = useMemo(() => {
    return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, [movies]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
        <Navbar />
        <div className="cr-loader" style={{ minHeight: '100vh' }}>
          <div className="cr-spinner" />
          <p style={{ color: '#888', fontWeight: 500, letterSpacing: '0.04em' }}>Loading CineRate...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <Navbar />

      {/* ── Hero Carousel ── */}
      <HeroCarousel movies={movies} />

      {/* ── Auto-Scroll Strip (Top Rated) ── */}
      <section id="top-rated" style={{ padding: '2rem 0', borderBottom: '1px solid #1A1A1A' }}>
        <div className="cr-section" style={{ paddingBottom: '0.75rem' }}>
          <div className="cr-section-header">
            <h2 className="cr-section-title">
              <Star style={{ width: 20, height: 20, fill: '#F5C518', color: '#F5C518' }} />
              Top Rated
            </h2>
          </div>
        </div>
        <div className="cr-strip-wrapper">
          <div className="cr-strip-track">
            {[...topRated, ...topRated].map((movie, i) => (
              <Link key={`${movie.id}-${i}`} to={`/movie/${movie.id}`} className="cr-strip-card">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/300x450/111/F5C518?text=No+Poster';
                  }}
                />
                <div className="cr-strip-info">
                  <div className="cr-strip-title">{movie.title}</div>
                  <div className="cr-strip-score">⭐ {movie.rating?.toFixed?.(1) ?? movie.rating}/5</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search & Filter Section ── */}
      <section id="search-section" className="cr-search-section">
        <div className="cr-search-section-inner">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 className="cr-section-title" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
              Search & Explore
            </h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Find your next favorite film</p>
          </div>

          <div className="cr-search-wrap">
            <div className="cr-search-icon">
              <Search style={{ width: 18, height: 18 }} />
            </div>
            <input
              type="text"
              className="cr-search-input"
              placeholder="Search movies by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="cr-filters">
            {GENRES.map((g) => (
              <button
                key={g}
                className={`cr-filter-tab ${activeGenre === g ? 'active' : ''}`}
                onClick={() => setActiveGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Movies Grid ── */}
      <section id="all-movies" className="cr-section">
        <div className="cr-section-header">
          <h2 className="cr-section-title">
            <Film style={{ width: 20, height: 20, color: '#F5C518' }} />
            {searchResults ? `Results for "${searchQuery}"` : 'All Movies'}
          </h2>
          <span style={{ color: '#555', fontSize: '0.85rem' }}>
            {filteredMovies.length} {filteredMovies.length === 1 ? 'title' : 'titles'}
          </span>
        </div>

        {searching ? (
          <div className="cr-loader">
            <div className="cr-spinner" />
            <p style={{ color: '#888' }}>Searching...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="cr-empty">
            <div className="cr-empty-icon">
              <Film style={{ width: 32, height: 32, color: '#555' }} />
            </div>
            <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 700 }}>No movies found</h3>
            <p style={{ color: '#666', maxWidth: 400 }}>
              Try adjusting your search or filter to discover more films.
            </p>
          </div>
        ) : (
          <div className="cr-movie-grid">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="cr-footer">
        <span className="cr-footer-brand">CineRate</span>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Home;
