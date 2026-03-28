import MovieCard from './MovieCard';
import { Film } from 'lucide-react';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center glass-panel rounded-3xl max-w-2xl mx-auto mt-12 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5">
          <Film className="w-10 h-10 text-slate-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No movies found</h3>
        <p className="text-slate-400">We couldn't find any movies matching your current filters. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 p-4">
      {movies.map((movie, index) => (
        <div 
          key={movie.id} 
          className="animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
