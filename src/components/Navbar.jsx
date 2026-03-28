import { Film, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Film className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Movie Review App
          </span>
        </div>
        <div className="md:hidden">
          <button className="text-slate-300 hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-indigo-400 transition-colors">Home</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Movies</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Top Rated</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
