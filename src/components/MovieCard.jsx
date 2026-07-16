import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const MovieCard = ({ movie, index = 0 }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="cr-card cr-card-appear"
      style={{ animationDelay: `${Math.min(index * 80, 700)}ms` }}
    >
      {/* Poster */}
      <div className="cr-card-poster">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x450/111/F5C518?text=No+Poster';
          }}
        />
        <div className="cr-card-overlay" />
        <div className="cr-card-year">{movie.year}</div>
      </div>

      {/* Info overlay */}
      <div className="cr-card-info">
        <div className="cr-card-genre">{movie.genre}</div>
        <div className="cr-card-title">{movie.title}</div>
        <div className="cr-card-footer">
          <RatingStars rating={movie.rating} readOnly size="sm" />
          <span className="cr-card-score">⭐ {movie.rating?.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
