import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import NavLinkItem from './NavLink';
import MobileMenu from './MobileMenu';
import { useUIStore } from '../../store/uiStore';

const navItems = [
  { label: 'Home',    to: '/',        end: true },
  { label: 'Gallery', to: '/gallery', end: false },
  { label: 'About',   to: '/about',   end: true },
  { label: 'Contact', to: '/contact', end: true },
];

/**
 * Fixed top navigation bar.
 * - Starts transparent.
 * - On scroll > 80px: blurs background (dark, semi-transparent).
 * - On mobile: hamburger icon opens full-screen overlay.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { menuOpen, toggleMenu } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-[16px] border-b border-[#222222]'
            : 'bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="font-playfair text-heading-lg text-text-primary hover:text-accent transition-colors duration-300"
          >
            Portfolio
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLinkItem to={item.to} end={item.end}>
                  {item.label}
                </NavLinkItem>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 group"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-text-primary origin-center"
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-4 h-[1.5px] bg-text-primary"
              animate={menuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-text-primary origin-center"
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && <MobileMenu items={navItems} />}
      </AnimatePresence>
    </>
  );
}
