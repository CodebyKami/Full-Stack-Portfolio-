import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
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

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
        isScrolled 
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" 
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group interactive">
          <span className="text-2xl font-black tracking-[-0.05em] font-heading">
            KAMRAN<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[3px] transition-colors relative interactive",
                    isActive ? "text-primary" : "text-muted hover:text-foreground"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-[1px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          
          <Button className="btn-primary h-auto py-3 px-6 text-[10px] tracking-widest interactive">
            LET'S TALK
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground p-2 interactive"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[400px] bg-surface z-[120] p-12 flex flex-col"
            >
              <button 
                className="self-end mb-12 interactive"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-8 w-8" />
              </button>
              
              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-extrabold font-heading tracking-tight hover:text-primary transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-12 border-t border-white/10">
                <Button className="btn-primary w-full">HIRE ME</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
