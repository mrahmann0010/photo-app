import { motion } from 'motion/react';
import NavLinkItem from './NavLink';
import { useUIStore } from '../../store/uiStore';

interface MobileMenuProps {
  items: { label: string; to: string; end: boolean }[];
}

/**
 * Full-screen mobile overlay menu with staggered link entrance.
 */
export default function MobileMenu({ items }: MobileMenuProps) {
  const closeMenu = useUIStore((s) => s.closeMenu);

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-8"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.ul
        className="flex flex-col items-center gap-6"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
      >
        {items.map((item) => (
          <motion.li
            key={item.to}
            variants={{
              hidden:  { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <NavLinkItem
              to={item.to}
              end={item.end}
              onClick={closeMenu}
              className="text-[clamp(2rem,6vw,3.5rem)] font-playfair"
            >
              {item.label}
            </NavLinkItem>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
