import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = ({ movies }) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const autoRef = useRef(null);

  const featured = movies.slice(0, 6);

  const goTo = useCallback((index) => {
    setPrev(current);
    setCurrent(index);
  }, [current]);

  const goNext = useCallback(() => {
    goTo((current + 1) % featured.length);
  }, [current, featured.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + featured.length) % featured.length);
  }, [current, featured.length, goTo]);

  // Auto-advance every 6s
  useEffect(() => {
    autoRef.current = setInterval(goNext, 6000);
    return () => clearInterval(autoRef.current);
  }, [goNext]);

  if (!featured.length) return null;

  return (
    <div id="featured" className="cr-hero">
      {/* Slides */}
      {featured.map((movie, i) => (
        <div
          key={movie.id}
          className={`cr-hero-slide ${i === current ? 'active' : 'inactive'}`}
        >
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="cr-hero-bg"
          />
          <div className="cr-hero-overlay" />
        </div>
      ))}

      {/* Content for active slide */}
      <div className="cr-hero-content">
        <div className="cr-hero-text" key={current}>
          <div className="cr-hero-badge">
            <span className="cr-hero-genre-pill">{featured[current]?.genre}</span>
            <span className="cr-hero-year">{featured[current]?.year}</span>
            {featured[current]?.rating > 0 && (
              <span className="cr-hero-rating-pill">
                <Star style={{ width: 14, height: 14, fill: '#F5C518' }} />
                {featured[current]?.rating?.toFixed(1)}/5
              </span>
            )}
          </div>

          <h1 className="cr-hero-title">{featured[current]?.title}</h1>

          <p className="cr-hero-desc">{featured[current]?.description}</p>

          <div className="cr-hero-actions">
            <Link to={`/movie/${featured[current]?.id}`} className="btn-yellow">
              <Play style={{ width: 18, height: 18, fill: '#000' }} />
              View Details
            </Link>
            <Link to={`/movie/${featured[current]?.id}`} className="btn-outline">
              <Info style={{ width: 17, height: 17 }} />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next buttons */}
      <div className="cr-hero-nav cr-hero-prev">
        <button className="cr-hero-nav-btn" onClick={goPrev} aria-label="Previous">
          <ChevronLeft size={22} />
        </button>
      </div>
      <div className="cr-hero-nav cr-hero-next">
        <button className="cr-hero-nav-btn" onClick={goNext} aria-label="Next">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="cr-hero-dots">
        {featured.map((_, i) => (
          <button
            key={i}
            className={`cr-hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
