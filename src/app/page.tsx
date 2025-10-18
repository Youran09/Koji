'use client';

import Link from 'next/link';
import {
  QrCode,
  MapPin,
  Leaf,
  BookOpen,
  ChevronRight,
  Camera,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

export default function HomePage() {

  const stats = [
    { icon: Leaf, value: '2.5t', label: 'CO₂ Saved', color: 'text-green-600' },
    { icon: TrendingUp, value: '5k+', label: 'kg Diverted', color: 'text-blue-600' },
    { icon: Users, value: '20+', label: 'Partners', color: 'text-purple-600' },
    { icon: Award, value: '10k+', label: 'Meals', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="container space-y-8 pt-80">
        <div className="text-center space-y-6">
          <h1 className="heading-xl animate-fade-in">
            Koji Copenhagen From Food Waste to{' '}
            <span className="gradient-text animate-pulse">Fermented Gold</span>
          </h1>
          <p className="text-lg max-w-lg mx-auto text-secondary animate-fade-in animation-delay-200">
            Scan any Koji Copenhagen product to trace its journey from local restaurant waste to your table
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center space-y-4 animate-slide-up animation-delay-300">
          <Link href="/scan" className="glass-btn w-full text-center inline-flex items-center justify-center gap-3 text-lg py-4">
            <QrCode className="w-6 h-6" />
            Scan Product Now
          </Link>
          <Link href="/partners" className="glass-btn-secondary w-full text-center inline-flex items-center justify-center gap-3">
            <MapPin className="w-5 h-5" />
            Explore Partners
          </Link>
        </div>

      </section>

      {/* Stats Grid */}
      <section className="container">
        <div className="text-center mb-8">
          <h2 className="heading-md animate-fade-in">Our Impact</h2>
          <p className="text-base text-secondary animate-fade-in animation-delay-100">Measuring our positive environmental footprint</p>
        </div>
        <div className="impact-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`glass-card text-center space-y-3 glass-animate-in animation-delay-${(index + 1) * 100}`}>
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-koji-cream to-koji-cream-dark flex items-center justify-center">
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="impact-value gradient-text">{stat.value}</div>
                <div className="text-sm text-secondary font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container space-y-6">
        <div className="text-center">
          <h2 className="heading-md animate-fade-in">What You Can Do</h2>
          <p className="text-base text-secondary animate-fade-in animation-delay-100">Explore features that connect you to the circular economy</p>
        </div>

        <div className="space-y-4">
          <Link href="/scan" className="glass-card flex items-center gap-5 p-6 glass-animate-in">
            <div className="w-14 h-14 bg-gradient-to-br from-koji-green to-koji-green-dark rounded-2xl flex items-center justify-center shadow-lg">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="heading-sm mb-1">Scan & Trace</h3>
              <p className="text-sm text-secondary">See your product&apos;s complete journey from waste to table</p>
            </div>
            <ChevronRight className="w-6 h-6 text-tertiary transition-transform group-hover:translate-x-1" />
          </Link>

          <Link href="/partners" className="glass-card flex items-center gap-5 p-6 glass-animate-in">
            <div className="w-14 h-14 bg-gradient-to-br from-koji-teal to-koji-teal-dark rounded-2xl flex items-center justify-center shadow-lg">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="heading-sm mb-1">Find Partners</h3>
              <p className="text-sm text-secondary">Discover local restaurants helping build a sustainable future</p>
            </div>
            <ChevronRight className="w-6 h-6 text-tertiary transition-transform group-hover:translate-x-1" />
          </Link>

          <Link href="/learn" className="glass-card flex items-center gap-5 p-6 glass-animate-in">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="heading-sm mb-1">Learn Koji</h3>
              <p className="text-sm text-secondary">Recipes, guides, and the science of fermentation</p>
            </div>
            <ChevronRight className="w-6 h-6 text-tertiary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Process Steps */}
      <section className="container space-y-8">
        <div className="text-center">
          <h2 className="heading-md animate-fade-in">How It Works</h2>
          <p className="text-base text-secondary animate-fade-in animation-delay-100">Our circular process in 4 simple steps</p>
        </div>

        <div className="space-y-5">
          {[
            {
              step: '1️⃣',
              title: 'Collect',
              description: 'Partner restaurants save their high-quality food waste',
              icon: '🍞',
              color: 'from-green-500 to-green-600'
            },
            {
              step: '2️⃣',
              title: 'Inoculate',
              description: 'We add koji spores to start the fermentation process',
              icon: '🧪',
              color: 'from-blue-500 to-blue-600'
            },
            {
              step: '3️⃣',
              title: 'Ferment',
              description: 'Controlled environment nurtures growth for 3-5 days',
              icon: '⏱️',
              color: 'from-green-500 to-green-600'
            },
            {
              step: '4️⃣',
              title: 'Package',
              description: 'QR-coded products ready for complete traceability',
              icon: '📦',
              color: 'from-purple-500 to-purple-600'
            },
          ].map((item, index) => (
            <div key={index} className={`glass-card p-6 glass-animate-in animation-delay-${(index + 1) * 100}`}>
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-koji-green to-koji-green-dark rounded-full flex items-center justify-center shadow-md">
                      <span className="text-lg">{item.step}</span>
                    </div>
                    <h3 className="heading-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Partners */}
      <section className="container space-y-4">
        <div className="text-center">
          <h2 className="heading-md">Our Partners</h2>
          <p className="text-base">Copenhagen&apos;s finest establishments</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {['Fjora CPH', 'Hart Bakery', 'Mirabelle', 'Amass'].map((partner) => (
            <div key={partner} className="card card-content text-center space-y-2">
              <div className="w-8 h-8 bg-gradient-to-br from-koji-cream-dark to-gray-200 rounded-full mx-auto"></div>
              <p className="text-sm font-medium">{partner}</p>
            </div>
          ))}
        </div>

        <Link href="/partners" className="btn btn-ghost btn-full">
          View All Partners
        </Link>
      </section>

      {/* Final CTA */}
      <section className="container">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-koji-teal via-koji-teal-dark to-koji-green opacity-90 rounded-3xl"></div>
          <div className="relative glass-effect text-center space-y-6 p-8 rounded-3xl border border-white/20 animate-scale-in">
            <h2 className="text-3xl font-bold text-white">Ready to Start?</h2>
            <p className="text-lg text-white/90 max-w-md mx-auto leading-relaxed">
              Scan any Koji Copenhagen product to discover its unique story and environmental impact
            </p>
            <Link href="/scan" className="btn btn-glass btn-large hover-lift interactive-scale inline-flex">
              <QrCode className="w-7 h-7" />
              Scan Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}