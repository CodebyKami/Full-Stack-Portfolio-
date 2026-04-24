import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './components/layout/Navbar';
import { Toaster } from 'sonner';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import { AnimatePresence, motion } from 'motion/react';
import ErrorBoundary from './components/ui/ErrorBoundary';

function AppContent() {
  const location = useLocation();
  const fetchPortfolio = useStore((state) => state.fetchPortfolio);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const isAdminPage = location.pathname === '/admin';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-x-hidden">
        <div className="noise-overlay" />
        <CustomCursor />
        {!isAdminPage && <Navbar />}
        <main>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Toaster position="top-center" richColors />
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
