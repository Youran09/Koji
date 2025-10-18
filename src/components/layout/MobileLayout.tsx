'use client';

import { ReactNode } from 'react';
import GlassHeader from './GlassHeader';
import FloatingNav from './FloatingNav';

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-koji-cream via-koji-cream to-koji-cream-dark relative overflow-hidden">
      {/* Background Glass Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-koji-rust/10 to-koji-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-koji-teal/8 to-koji-rust/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-koji-cream-dark/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Google Glass-Style Header */}
      <GlassHeader />

      {/* Main Content */}
      <main className="pb-6 relative z-10">
        {children}
      </main>

      {/* Floating Navigation */}
      <FloatingNav />
    </div>
  );
}