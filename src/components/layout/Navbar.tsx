import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Terminal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Resume', href: '#resume' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container max-w-6xl">
        <div className={cn(
          "relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500",
          isScrolled 
            ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-border shadow-premium" 
            : "bg-transparent"
        )}>
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tighter text-foreground">
              KAMRAN<span className="text-primary group-hover:animate-pulse">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-[13px] font-bold uppercase tracking-widest transition-colors",
                    isActive ? "text-primary" : "text-muted hover:text-foreground"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button className="hidden md:flex btn-primary h-10 px-6 rounded-xl font-bold text-[11px] tracking-widest uppercase">
              Contact
            </Button>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden h-10 w-10 flex items-center justify-center text-foreground interactive rounded-xl hover:bg-surface transition-colors z-[130]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4">
                <span className={cn(
                  "absolute left-0 w-full h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "top-2 rotate-45" : "top-0"
                )} />
                <span className={cn(
                  "absolute left-0 w-full h-0.5 bg-current transition-all duration-300 top-2",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                )} />
                <span className={cn(
                  "absolute left-0 w-full h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "top-2 -rotate-45" : "top-4"
                )} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white dark:bg-black z-[120] flex flex-col pt-32 px-10"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-5xl font-black font-heading tracking-tighter transition-colors",
                    activeSection === link.href.substring(1) ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-12 pt-12 border-t border-border flex flex-col gap-8"
              >
                <div className="flex items-center gap-6">
                  <ThemeToggle />
                  <span className="text-sm font-bold text-muted uppercase tracking-widest">Switch Theme</span>
                </div>
                <Button className="btn-primary w-full h-16 text-xl rounded-2xl">Start a Project</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
