import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './components/layout/Navbar';
import AIChat from './components/ai/AIChat';
import { Toaster } from 'sonner';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import { AnimatePresence, motion } from 'motion/react';

function AppContent() {
  const location = useLocation();
  const fetchPortfolio = useStore((state) => state.fetchPortfolio);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative">
      <Preloader />
      <div className="noise-overlay" />
      <CustomCursor />
      {!isAdminPage && <Navbar />}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isAdminPage && <AIChat />}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
