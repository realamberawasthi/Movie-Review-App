import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Film, Star, Clock, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import moviesData from '../data/movies.json';
import { hasApiKey, getMovieById } from '../services/tmdbApi';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovie = async () => {
      setLoading(true);
      // Try API
      if (hasApiKey()) {
        const apiMovie = await getMovieById(id);
        if (apiMovie) {
          setMovie(apiMovie);
          const stored = localStorage.getItem(`rating_${id}`);
          if (stored) setUserRating(parseInt(stored));
          setLoading(false);
          return;
        }
      }
      // Fallback to local
      const localMovie = moviesData.find(m => m.id === parseInt(id));
      if (localMovie) {
        setMovie(localMovie);
        const stored = localStorage.getItem(`rating_${localMovie.id}`);
        if (stored) setUserRating(parseInt(stored));
      }
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  const handleRating = (star) => {
    setUserRating(star);
    localStorage.setItem(`rating_${movie.id}`, star);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
        <Navbar />
        <div className="cr-loader" style={{ minHeight: '100vh' }}>
          <div className="cr-spinner" />
          <p style={{ color: '#888' }}>Loading movie...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
        <Navbar />
        <div className="cr-empty" style={{ minHeight: '100vh' }}>
          <div className="cr-empty-icon">
            <Film style={{ width: 32, height: 32, color: '#555' }} />
          </div>
          <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
            Movie Not Found
          </h2>
          <Link to="/" className="btn-back">
            <ArrowLeft style={{ width: 16, height: 16 }} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const castList = movie.cast ? movie.cast.split(',').map(c => c.trim()) : [];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <Navbar />

      {/* ── Cinematic Background ── */}
      <div className="cr-details-bg">
        <img src={movie.backdrop || movie.poster} alt="" />
        <div className="cr-details-bg-overlay" />
      </div>

      {/* ── Content ── */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '6rem 2.5rem 4rem' }}>
        
        {/* Back button */}
        <Link to="/" className="btn-back" style={{ marginBottom: '2.5rem', display: 'inline-flex' }}>
          <ArrowLeft style={{ width: 16, height: 16 }} />
          Back to all movies
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* Desktop layout */}
          <div className="cr-details-layout">
            {/* Poster */}
            <div className="cr-details-poster-wrap">
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(245,197,24,0.15)',
                boxShadow: '0 20px 80px rgba(0,0,0,0.7), 0 0 30px rgba(245,197,24,0.06)',
                position: 'relative',
              }}>
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  style={{ width: '100%', display: 'block' }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/300x450/111/F5C518?text=No+Poster';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(17,17,17,0.9), transparent)',
                }} />
              </div>
            </div>

            {/* Details */}
            <div className="cr-details-info">
              {/* Badge row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span className="cr-hero-genre-pill">{movie.genre}</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  color: '#999', fontSize: '0.85rem', fontWeight: 500,
                }}>
                  <Calendar style={{ width: 14, height: 14, color: '#F5C518' }} />
                  {movie.year}
                </span>
                {movie.runtime && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    color: '#999', fontSize: '0.85rem', fontWeight: 500,
                  }}>
                    <Clock style={{ width: 14, height: 14, color: '#F5C518' }} />
                    {movie.runtime} min
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.95,
                letterSpacing: '0.02em',
                color: 'white',
                marginBottom: '0.75rem',
                textShadow: '0 4px 30px rgba(0,0,0,0.8)',
              }}>
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p style={{
                  color: '#F5C518', fontStyle: 'italic', fontSize: '1.1rem',
                  fontWeight: 500, marginBottom: '1.5rem', opacity: 0.85,
                }}>
                  "{movie.tagline}"
                </p>
              )}

              {/* Rating display */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                padding: '1.25rem', borderRadius: 12,
                background: 'rgba(245,197,24,0.04)',
                border: '1px solid rgba(245,197,24,0.1)',
                marginBottom: '2rem',
              }}>
                <div>
                  <div style={{ color: '#888', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                    Rating
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star style={{ width: 22, height: 22, fill: '#F5C518', color: '#F5C518' }} />
                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                      {movie.rating?.toFixed?.(1) ?? movie.rating}
                    </span>
                    <span style={{ color: '#666', fontWeight: 500 }}>/5</span>
                  </div>
                </div>
                {userRating > 0 && (
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem' }}>
                    <div style={{ color: '#888', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                      Your Rating
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Star style={{ width: 18, height: 18, fill: '#F5C518', color: '#F5C518' }} />
                      <span style={{ fontSize: '1.3rem', fontWeight: 700, color: '#F5C518' }}>{userRating}</span>
                      <span style={{ color: '#666', fontWeight: 500 }}>/5</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Synopsis */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem',
                  letterSpacing: '0.08em', color: '#F5C518', marginBottom: '0.75rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <Film style={{ width: 18, height: 18 }} />
                  Synopsis
                </h3>
                <p style={{
                  color: '#C8C8C8', fontSize: '1rem', lineHeight: 1.8,
                  maxWidth: 700,
                }}>
                  {movie.description}
                </p>
              </div>

              {/* Cast */}
              {castList.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem',
                    letterSpacing: '0.08em', color: '#F5C518', marginBottom: '0.75rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    <Users style={{ width: 18, height: 18 }} />
                    Top Cast
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {castList.map((actor) => (
                      <span key={actor} className="cr-cast-badge">{actor}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rate this movie */}
              <div className="cr-glass" style={{ padding: '1.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(245,197,24,0.04), transparent)',
                  pointerEvents: 'none',
                }} />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>
                      Rate this movie
                    </h4>
                    <p style={{ color: '#666', fontSize: '0.85rem' }}>
                      Share your thoughts with the community
                    </p>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    background: 'rgba(0,0,0,0.3)', padding: '0.6rem 0.8rem',
                    borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="cr-star-btn"
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star
                          style={{
                            width: 28, height: 28,
                            fill: star <= (hoverRating || userRating) ? '#F5C518' : 'transparent',
                            color: star <= (hoverRating || userRating) ? '#F5C518' : '#444',
                            transition: 'all 0.2s ease',
                            filter: star <= (hoverRating || userRating) ? 'drop-shadow(0 0 6px rgba(245,197,24,0.5))' : 'none',
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="cr-footer">
        <span className="cr-footer-brand">CineRate</span>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </footer>
    </div>
  );
};

export default MovieDetails;
