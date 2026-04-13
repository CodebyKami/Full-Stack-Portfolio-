import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './components/layout/Navbar';
import AIChat from './components/ai/AIChat';
import { Toaster } from 'sonner';

export default function App() {
  const fetchPortfolio = useStore((state) => state.fetchPortfolio);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <AIChat />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}
