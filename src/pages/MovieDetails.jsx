import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Film, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import RatingStars from '../components/RatingStars';
import moviesData from '../data/movies.json';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Find movie by id
    const foundMovie = moviesData.find(m => m.id === parseInt(id));
    if (foundMovie) {
      setMovie(foundMovie);
      // Retrieve stored rating if exists
      const storedRating = localStorage.getItem(`rating_${foundMovie.id}`);
      if (storedRating) {
        setUserRating(parseInt(storedRating));
      }
    }
  }, [id]);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
    localStorage.setItem(`rating_${movie.id}`, newRating);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-white mb-4">Movie Not Found</h2>
        <Link to="/" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  // Use a heavily blurred version of the poster for the background for a cinematic feel
  return (
    <div className="min-h-screen bg-slate-900 relative selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Cinematic Blur Background */}
      <div className="fixed inset-0 z-0">
        <img src={movie.poster} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl"></div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 mb-8 backdrop-blur-md">
          <ArrowLeft className="w-4 h-4" /> 
          <span className="font-medium text-sm">Back to all movies</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Poster Column */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group relative">
              <img 
                src={movie.poster} 
                alt={`${movie.title} poster`}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-8 lg:col-span-9 glass-panel rounded-3xl p-8 lg:p-10 flex flex-col justify-start">
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-sm font-semibold tracking-wide shadow-inner">
                {movie.genre}
              </span>
              <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                {movie.year}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm mb-1 font-medium">Average Rating</span>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-white tracking-tight">{movie.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-medium">/ 5</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Film className="w-5 h-5 text-indigo-400" />
              Synopsis
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-3xl">
              {movie.description}
            </p>

            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Top Cast</h3>
              <p className="text-white text-lg font-medium">{movie.cast}</p>
            </div>

            {/* User Rating Section */}
            <div className="mt-auto bg-slate-800/40 rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Rate this movie</h4>
                  <p className="text-sm text-slate-400">Share your thoughts with the community</p>
                </div>
                <div className="bg-slate-900/50 px-4 py-3 rounded-xl border border-white/5 shadow-inner">
                  <RatingStars rating={userRating} onChange={handleRatingChange} size="lg" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;
