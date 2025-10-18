'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, QrCode, MapPin, BookOpen, Plus, X } from 'lucide-react';

interface FloatingNavProps {
  className?: string;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Scan', href: '/scan', icon: QrCode },
  { name: 'Partners', href: '/partners', icon: MapPin },
  { name: 'Learn', href: '/learn', icon: BookOpen },
];

export default function FloatingNav({ className = '' }: FloatingNavProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  // Handle drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isExpanded) return; // Don't drag when expanded
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isExpanded) return; // Don't drag when expanded
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = Math.max(0, Math.min(window.innerWidth - 64, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 64, e.clientY - dragStart.y));

      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const newX = Math.max(0, Math.min(window.innerWidth - 64, touch.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 64, touch.clientY - dragStart.y));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // Auto-hide after inactivity
  useEffect(() => {
    if (!isExpanded) return;

    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 3000); // Auto-hide after 3 seconds

    return () => clearTimeout(timer);
  }, [isExpanded]);

  const toggleExpanded = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      ref={navRef}
      className={`floating-nav ${isExpanded ? 'expanded' : ''} ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Main floating button */}
      <div
        className="floating-nav-main"
        onClick={toggleExpanded}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </div>

      {/* Expanded navigation items */}
      {isExpanded && (
        <div className="floating-nav-items">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`floating-nav-item ${isActive ? 'active' : ''}`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                onClick={() => setIsExpanded(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="floating-nav-tooltip">{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}