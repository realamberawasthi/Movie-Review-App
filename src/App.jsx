import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div style={{
        opacity: showSplash ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;