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
        "fixed top-0 left-0 right-0 z-[2000] transition-all duration-300",
        "bg-white/80 backdrop-blur-md border-b border-border/40 py-3 shadow-sm"
      )}
    >
      <div className="container max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              KAMRAN<span className="text-primary group-hover:text-primary/70 transition-colors">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-[13px] font-semibold tracking-wide transition-all duration-200 rounded-lg",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* ThemeToggle hidden as requested */}
            {/* <ThemeToggle /> */}
            <a href="#contact" className="hidden md:block">
              <Button className="bg-foreground text-background hover:bg-foreground/90 h-10 px-6 rounded-lg font-bold text-xs tracking-wider uppercase transition-all">
                Hire Me
              </Button>
            </a>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden h-10 w-10 flex items-center justify-center text-foreground hover:bg-surface rounded-lg transition-colors z-[2002]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 h-screen w-screen bg-white z-[2001] flex flex-col p-8 pt-24 overflow-y-auto"
          >
            <div className="flex flex-col gap-4 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-4xl font-bold tracking-tight py-2 transition-colors",
                    activeSection === link.href.substring(1) ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <div className="mt-12 pt-8 border-t border-border flex flex-col gap-6">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-14 text-lg rounded-xl bg-foreground text-background">Get in Touch</Button>
                </a>
              </div>
            </div>
            
            {/* Background elements to ensure opacity */}
            <div className="absolute inset-0 bg-white -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
