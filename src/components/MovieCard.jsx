import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <div className="relative rounded-2xl overflow-hidden glass-panel h-full transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/20">
        
        {/* Poster Image */}
        <div className="aspect-[2/3] w-full overflow-hidden relative">
          <img 
            src={movie.poster} 
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            loading="lazy"
          />
          {/* Subtle gradient overlay at the bottom for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          
          {/* Year badge */}
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-white border border-white/10 shadow-lg">
            {movie.year}
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
              {movie.genre}
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white mb-1 line-clamp-1 group-hover:text-indigo-400 transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <RatingStars rating={movie.rating} readOnly size="sm" />
            <span className="text-sm font-medium text-yellow-400">
              {movie.rating.toFixed(1)}/5
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
