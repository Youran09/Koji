'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, Scan, MapPin, BookOpen, Home as HomeIcon } from 'lucide-react';

interface GlassHeaderProps {
  className?: string;
}

const pageContexts = {
  '/': {
    title: null,
    subtitle: null,
    context: null,
    icon: HomeIcon,
  },
  '/scan': {
    title: 'Koji Copenhagen',
    subtitle: 'QR Scanner',
    context: 'Ready to Scan',
    icon: Scan,
  },
  '/partners': {
    title: 'Koji Copenhagen',
    subtitle: 'Partner Network',
    context: 'Copenhagen',
    icon: MapPin,
  },
  '/learn': {
    title: 'Koji Copenhagen',
    subtitle: 'Learning Hub',
    context: 'Expand Knowledge',
    icon: BookOpen,
  },
} as const;

export default function GlassHeader({ className = '' }: GlassHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Get current page context
  const currentContext = pageContexts[pathname as keyof typeof pageContexts] || pageContexts['/'];
  const ContextIcon = currentContext.icon;

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled
      setIsScrolled(currentScrollY > 20);

      // Auto-hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        glass-header glass-header-floating
        ${isScrolled ? 'glass-header-scrolled' : ''}
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        sticky top-0 z-50 safe-top
        transition-all duration-500 ease-out
        ${className}
      `}
    >
      <div className="flex items-center justify-between h-16 px-4">
        {/* Brand Section */}
        <Link href="/" className="glass-brand flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-koji-green to-koji-green-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <span className="text-lg">♻️</span>
          </div>
          {currentContext.title && (
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-koji-teal leading-tight">
                {currentContext.title}
              </div>
              <div className="text-xs font-medium text-koji-teal/70 leading-tight">
                {currentContext.subtitle}
              </div>
            </div>
          )}
        </Link>

        {/* Context Section */}
        <div className="flex items-center space-x-3">
          {/* Page Context */}
          {currentContext.context && (
            <div className="glass-context-card flex items-center space-x-2">
              <ContextIcon className="w-4 h-4" />
              <span>{currentContext.context}</span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {pathname !== '/scan' && (
              <Link
                href="/scan"
                className="glass-action-button group"
                title="Quick Scan"
              >
                <Scan className="w-5 h-5 text-koji-teal group-hover:text-koji-green transition-colors" />
              </Link>
            )}

            <button
              className="glass-action-button group"
              title="User Menu"
            >
              <User className="w-5 h-5 text-koji-teal group-hover:text-koji-green transition-colors" />
            </button>
          </div>

          {/* Mobile Context Indicator */}
          <div className="sm:hidden glass-action-button">
            <ContextIcon className="w-5 h-5 text-koji-teal" />
          </div>
        </div>
      </div>

      {/* Progress/Status Bar for specific pages */}
      {pathname === '/scan' && (
        <div className="px-4 pb-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-koji-green to-koji-teal rounded-full w-0 animate-pulse"></div>
          </div>
        </div>
      )}
    </header>
  );
}