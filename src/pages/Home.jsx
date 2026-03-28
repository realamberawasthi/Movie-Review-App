import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import MovieList from '../components/MovieList';
import moviesData from '../data/movies.json';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [year, setYear] = useState("All");
  const [rating, setRating] = useState("All");

  useEffect(() => {
    // Simulate API fetch delay for smooth loading animation
    const fetchMovies = () => {
      setLoading(true);
      setTimeout(() => {
        setMovies(moviesData);
        setLoading(false);
      }, 600);
    };
    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Search
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Genre Filter
      const matchesGenre = genre === "All" || movie.genre === genre;
      
      // Year Filter
      let matchesYear = true;
      if (year !== "All") {
        if (year === "Older") {
          matchesYear = movie.year < 1990;
        } else {
          const decade = parseInt(year.substring(0, 4));
          matchesYear = movie.year >= decade && movie.year < decade + 10;
        }
      }

      // Rating Filter
      let matchesRating = true;
      if (rating !== "All") {
        if (rating === "5 Stars") matchesRating = movie.rating >= 4.8;
        if (rating === "4+ Stars") matchesRating = movie.rating >= 4.0;
        if (rating === "3+ Stars") matchesRating = movie.rating >= 3.0;
      }

      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });
  }, [movies, searchQuery, genre, year, rating]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Cinematic Adventure</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Explore thousands of movies, filter by your favorite genres, and read reviews from our community.
        </p>
        
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Filter 
          genre={genre} setGenre={setGenre} 
          year={year} setYear={setYear} 
          rating={rating} setRating={setRating} 
        />
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 mb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <p className="text-slate-400 font-medium tracking-wide">Fetching movies...</p>
          </div>
        ) : (
          <MovieList movies={filteredMovies} />
        )}
      </main>
    </div>
  );
};

export default Home;
