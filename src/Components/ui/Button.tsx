import React from 'react';

type Variant = 'primary' | 'ghost' | 'accent';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'border border-[rgba(242,240,235,0.3)] text-[#F2F0EB] hover:border-[#F2F0EB] hover:bg-[rgba(255,255,255,0.05)] rounded-[2px] transition-all duration-300',
  ghost:
    'btn-ghost text-[#F2F0EB] hover:text-accent transition-colors duration-300',
  accent:
    'bg-accent text-bg-base hover:bg-accent-hover rounded-[2px] transition-all duration-300',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body-md',
  lg: 'px-8 py-4 text-body-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-inter font-medium tracking-wide
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
