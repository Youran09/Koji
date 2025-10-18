'use client';

import { useState } from 'react';
import {
  BookOpen,
  Play,
  Clock,
  ChefHat,
  Leaf,
  Beaker,
  Award,
  ArrowRight,
  Download,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'recipes' | 'science' | 'sustainability';
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 'what-is-koji',
    title: 'What is Koji? The Magic Mold',
    description: 'Discover the fascinating world of Aspergillus oryzae and how this ancient fungus transforms food waste into culinary gold.',
    category: 'basics',
    readTime: 5,
    difficulty: 'beginner',
    image: '🍄',
    featured: true,
  },
  {
    id: 'fermentation-science',
    title: 'The Science Behind Fermentation',
    description: 'Deep dive into the biochemical processes that make koji fermentation possible and so effective.',
    category: 'science',
    readTime: 8,
    difficulty: 'intermediate',
    image: '🧪',
  },
  {
    id: 'environmental-impact',
    title: 'Fighting Food Waste with Fermentation',
    description: 'Learn how koji fermentation helps reduce food waste and contributes to a circular economy.',
    category: 'sustainability',
    readTime: 6,
    difficulty: 'beginner',
    image: '♻️',
    featured: true,
  },
  {
    id: 'basic-miso-recipe',
    title: 'Making Your First Miso',
    description: 'Step-by-step guide to creating delicious miso from food waste using traditional techniques.',
    category: 'recipes',
    readTime: 15,
    difficulty: 'intermediate',
    image: '🥢',
  },
  {
    id: 'koji-starter-guide',
    title: 'Growing Your Own Koji Starter',
    description: 'Learn how to cultivate and maintain your own koji culture for continuous fermentation.',
    category: 'basics',
    readTime: 12,
    difficulty: 'advanced',
    image: '🌱',
  },
  {
    id: 'umami-chemistry',
    title: 'The Chemistry of Umami',
    description: 'Understand how koji creates complex flavors and enhances the umami taste in fermented foods.',
    category: 'science',
    readTime: 10,
    difficulty: 'advanced',
    image: '⚗️',
  },
];

const categories = [
  { id: 'all', name: 'All Topics', icon: BookOpen },
  { id: 'basics', name: 'Basics', icon: Leaf },
  { id: 'recipes', name: 'Recipes', icon: ChefHat },
  { id: 'science', name: 'Science', icon: Beaker },
  { id: 'sustainability', name: 'Sustainability', icon: Award },
];

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter(article =>
    selectedCategory === 'all' || article.category === selectedCategory
  );

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="container pt-6">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="heading-xl">
            Learn About <span className="gradient-text">Koji</span>
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Discover the ancient art and modern science of koji fermentation.
            Learn how we transform food waste into delicious, sustainable products.
          </p>
        </div>
      </section>


      {/* Category Filter */}
      <section className="container">
        <div className="card card-content">
          <h3 className="heading-sm mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn btn-small interactive-scale ${
                    selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <div
              key={article.id}
              className={`card card-hover card-content hover-lift interactive-scale animate-slide-up animation-delay-${(index + 1) * 100}`}
            >
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-koji-teal to-koji-teal-dark rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4">
                  {article.image}
                </div>
                <h3 className="heading-sm mb-2">{article.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {article.description}
                </p>
              </div>


              <button className="btn btn-secondary btn-full">
                Read Article
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="container">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-koji-teal via-koji-teal-dark to-koji-green opacity-90"></div>
          <div className="relative glass-effect p-8 border border-white/20 text-white">
            <div className="text-center space-y-6">
              <h2 className="heading-lg">Ready to Start Your Koji Journey?</h2>
              <p className="text-lg opacity-90 max-w-md mx-auto">
                Download our comprehensive beginner's guide to koji fermentation
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="btn btn-glass btn-large">
                  <Download className="w-5 h-5" />
                  Download Guide
                </button>
                <Link href="/partners" className="btn btn-glass btn-large">
                  <ExternalLink className="w-5 h-5" />
                  Find Workshops
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Learning */}
      <section className="container">
        <h2 className="heading-md mb-6">Video Tutorials</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card card-hover hover-lift interactive-scale">
            <div className="aspect-video bg-gradient-to-br from-koji-green to-koji-green-dark rounded-xl relative overflow-hidden mb-4">
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-16 h-16 glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-semibold">Koji Basics</p>
                <p className="text-xs opacity-80">12 minutes</p>
              </div>
            </div>
            <div className="card-content">
              <h3 className="heading-sm mb-2">Introduction to Koji</h3>
              <p className="text-sm text-secondary">
                Learn the fundamentals of koji cultivation and its role in fermentation
              </p>
            </div>
          </div>

          <div className="card card-hover hover-lift interactive-scale">
            <div className="aspect-video bg-gradient-to-br from-koji-teal to-koji-teal-dark rounded-xl relative overflow-hidden mb-4">
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-16 h-16 glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-semibold">Making Miso</p>
                <p className="text-xs opacity-80">18 minutes</p>
              </div>
            </div>
            <div className="card-content">
              <h3 className="heading-sm mb-2">Step-by-Step Miso</h3>
              <p className="text-sm text-secondary">
                Watch our master fermentation expert create miso from scratch
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}