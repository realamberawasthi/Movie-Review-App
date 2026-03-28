import { ChevronDown } from 'lucide-react';

const categories = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Animation", "Crime"];
const years = ["All", "2020s", "2010s", "2000s", "1990s", "Older"];
const ratings = ["All", "5 Stars", "4+ Stars", "3+ Stars"];

const FilterDropdown = ({ label, options, value, onChange }) => (
  <div className="relative group">
    <select
      className="appearance-none bg-slate-800/60 border border-slate-700/50 text-slate-200 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:bg-slate-700/60 transition-colors cursor-pointer shadow-sm backdrop-blur-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="All" disabled className="text-slate-500">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-slate-800 text-slate-200">
          {opt}
        </option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400 group-hover:text-indigo-400 transition-colors">
      <ChevronDown className="w-4 h-4" />
    </div>
  </div>
);

const Filter = ({ genre, setGenre, year, setYear, rating, setRating }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
      <FilterDropdown label="Genre" options={categories} value={genre} onChange={setGenre} />
      <FilterDropdown label="Decade" options={years} value={year} onChange={setYear} />
      <FilterDropdown label="Rating" options={ratings} value={rating} onChange={setRating} />
    </div>
  );
};

export default Filter;
