import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavLinkItemProps {
  to: string;
  end?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Individual nav link with an animated underline that draws in on hover
 * and stays visible when the route is active.
 */
export default function NavLinkItem({ to, end, children, className = '', onClick }: NavLinkItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `relative group font-inter text-body-sm font-medium tracking-wide
         transition-colors duration-300 py-1
         ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}
         ${className}`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {/* Animated underline */}
          <span
            className="absolute left-0 bottom-0 h-[1px] bg-accent transition-all duration-300"
            style={{
              width: isActive ? '100%' : '0%',
              transitionProperty: 'width',
            }}
          />
          <span
            className="absolute left-0 bottom-0 h-[1px] bg-accent transition-all duration-300
              group-hover:w-full w-0"
            style={{ willChange: 'width' }}
          />
        </>
      )}
    </NavLink>
  );
}
