import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // After navigating to Home, scroll to the target section
  const scrollTo = (sectionId) => {
    setMenuOpen(false);

    if (location.pathname !== '/') {
      // Navigate to home with the section hash
      navigate('/?scrollTo=' + sectionId);
    } else {
      // Already on home, just scroll
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`cr-navbar ${scrolled ? 'solid' : 'transparent'}`}>
      {/* Logo */}
      <Link to="/" className="cr-logo">
        <div className="cr-logo-icon">
          <Film style={{ color: '#000', width: 22, height: 22 }} />
        </div>
        <span className="cr-logo-text">CineRate</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        <button className="cr-nav-btn" onClick={() => scrollTo('featured')}>Home</button>
        <button className="cr-nav-btn" onClick={() => scrollTo('all-movies')}>Movies</button>
        <button className="cr-nav-btn" onClick={() => scrollTo('top-rated')}>Top Rated</button>
        <button className="cr-search-btn" onClick={() => scrollTo('search-section')}>
          <Search style={{ width: 14, height: 14 }} />
          Search
        </button>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(o => !o)}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '72px', left: 0, right: 0,
          background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(245,197,24,0.15)',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          zIndex: 200,
        }}>
          <button className="cr-nav-btn text-left" onClick={() => scrollTo('featured')}>Home</button>
          <button className="cr-nav-btn text-left" onClick={() => scrollTo('all-movies')}>Movies</button>
          <button className="cr-nav-btn text-left" onClick={() => scrollTo('top-rated')}>Top Rated</button>
          <button className="cr-search-btn" style={{ width: 'fit-content' }} onClick={() => scrollTo('search-section')}>
            <Search style={{ width: 14, height: 14 }} />
            Search
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
