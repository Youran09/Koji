'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Home, QrCode, MapPin, BookOpen, User } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Scan', href: '/scan', icon: QrCode },
  { name: 'Partners', href: '/partners', icon: MapPin },
  { name: 'Learn', href: '/learn', icon: BookOpen },
];

export default function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-koji-cream via-koji-cream to-koji-cream-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20 safe-top backdrop-blur-xl">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3 hover-lift interactive-scale">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-koji-rust to-koji-rust-dark flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="text-2xl">♻️</span>
              </div>
              <div>
                <div className="heading-xl text-koji-teal">
                  Koji Copenhagen
                </div>
              </div>
            </Link>

            {/* Desktop only - user menu */}
            <div className="hidden md:block">
              <button className="p-3 rounded-xl glass-effect hover:bg-white/20 transition-all duration-300 hover-lift interactive-scale">
                <User className="w-6 h-6 text-koji-teal" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-32">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav safe-bottom">
        <div className="mobile-nav-grid">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`mobile-nav-item ${isActive ? 'active' : ''} animate-slide-up animation-delay-${index * 100}`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-medium transition-all duration-200 ${isActive ? 'font-semibold' : ''}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}