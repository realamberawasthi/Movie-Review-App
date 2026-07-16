// TMDB API Service
// Get a free API key at: https://www.themoviedb.org/settings/api
// Then create a .env.local file with: VITE_TMDB_API_KEY=your_key_here

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const getBackdropUrl = (path) =>
  path ? `${IMG_BASE}/w1280${path}` : null;

const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 14: 'Fantasy',
  27: 'Horror', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
  53: 'Thriller', 10752: 'War', 37: 'Western',
};

const transformMovie = (m) => ({
  id: m.id,
  title: m.title || m.name || 'Unknown',
  year: m.release_date ? new Date(m.release_date).getFullYear() : '—',
  genre: m.genres?.[0]?.name || (m.genre_ids?.[0] ? GENRE_MAP[m.genre_ids[0]] : 'Unknown'),
  rating: parseFloat((m.vote_average / 2).toFixed(1)),
  poster: getPosterUrl(m.poster_path) || m.poster,
  backdrop: getBackdropUrl(m.backdrop_path),
  description: m.overview || m.description || '',
  cast: m.credits?.cast?.slice(0, 4).map(c => c.name).join(', ') || m.cast || '',
  tagline: m.tagline || '',
  runtime: m.runtime || null,
  fromApi: true,
});

async function apiFetch(endpoint, params = {}) {
  if (!API_KEY) return null;
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', API_KEY);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url.toString());
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const hasApiKey = () => Boolean(API_KEY);

export async function searchMovies(query) {
  if (!query.trim() || !API_KEY) return null;
  const data = await apiFetch('/search/movie', { query: encodeURIComponent(query), include_adult: false });
  if (!data) return null;
  return data.results.map(transformMovie);
}

export async function getPopularMovies(page = 1) {
  const data = await apiFetch('/movie/popular', { page });
  if (!data) return null;
  return data.results.map(transformMovie);
}

export async function getMovieById(id) {
  const data = await apiFetch(`/movie/${id}`, { append_to_response: 'credits' });
  if (!data) return null;
  return transformMovie(data);
}
