'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import BatchInfo from '@/components/features/BatchInfo';
import JourneyTimeline from '@/components/features/JourneyTimeline';
import { Batch, JourneyStep } from '@/types';

// Mock data - replace with Firebase fetch
const mockBatch: Batch = {
  batchId: 'KC2025-001',
  productType: 'miso',
  productName: 'Barley Miso - 6 Month',
  productionDate: new Date('2025-01-15'),

  source: {
    partnerId: 'fjora-cph',
    partnerName: 'Fjora CPH',
    location: {
      lat: 55.6761,
      lng: 12.5683,
    },
    wasteType: ['bread', 'vegetables'],
    wasteWeight: 25,
  },

  fermentation: {
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-01-18'),
    duration: 3,
    method: 'barley_koji',
    temperature: 30,
    humidity: 75,
  },

  aging: {
    startDate: new Date('2025-01-18'),
    expectedEndDate: new Date('2025-07-18'),
    currentAge: 3,
    targetAge: 180,
  },

  impact: {
    co2Saved: 12.5,
    wasteDiverted: 25,
    mealsEquivalent: 100,
    waterSaved: 500,
  },

  media: {
    photos: [
      '/images/batch-1.jpg',
      '/images/batch-2.jpg',
      '/images/batch-3.jpg',
      '/images/batch-4.jpg',
    ],
    videos: [],
    liveStreamUrl: 'https://twitch.tv/kojicph',
  },

  journey: [
    {
      id: '1',
      day: 0,
      title: 'Food Waste Collection',
      description: 'Collected 25kg of bread and vegetable waste from Fjora CPH restaurant.',
      date: new Date('2025-01-15'),
      photo: '/images/collection.jpg',
      status: 'completed',
    },
    {
      id: '2',
      day: 1,
      title: 'Koji Inoculation',
      description: 'Mixed food waste with barley and inoculated with koji spores.',
      date: new Date('2025-01-16'),
      photo: '/images/inoculation.jpg',
      status: 'completed',
    },
    {
      id: '3',
      day: 3,
      title: 'Fermentation Complete',
      description: 'Koji fermentation complete. Beautiful white mycelium growth achieved.',
      date: new Date('2025-01-18'),
      photo: '/images/fermented.jpg',
      status: 'completed',
    },
    {
      id: '4',
      day: 4,
      title: 'Miso Production',
      description: 'Mixed fermented koji with salt and soybeans. Aging process begins.',
      date: new Date('2025-01-19'),
      photo: '/images/miso-start.jpg',
      status: 'current',
    },
    {
      id: '5',
      day: 180,
      title: 'Ready for Harvest',
      description: 'Miso fully aged and ready for packaging and distribution.',
      date: new Date('2025-07-18'),
      status: 'upcoming',
    },
  ] as JourneyStep[],

  qrCode: 'https://koji.cph/batch/KC2025-001',
  status: 'aging',
  certifications: ['Organic', 'Zero Waste Certified', 'Local Sourced'],
};

export default function BatchPage() {
  const params = useParams();
  const [batch, setBatch] = useState<Batch | null>(null);
  const [activeTab, setActiveTab] = useState<'journey' | 'details'>('journey');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBatch(mockBatch);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Koji Copenhagen - Batch ${batch?.batchId}`,
          text: `Check out the journey of this koji product from food waste to fermented gold!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-koji-rust border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-koji-teal-light">Loading batch information...</p>
        </div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-koji-teal mb-4">Batch Not Found</h2>
          <p className="text-koji-teal-light mb-6">
            We couldn\'t find the batch you\'re looking for.
          </p>
          <Link href="/scan" className="btn-primary">
            Scan Another Product
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = batch.journey.findIndex(step => step.status === 'current');

  return (
    <div className="min-h-screen bg-koji-cream py-8">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 text-koji-teal hover:text-koji-rust transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Scanner
          </Link>

          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-white transition-colors"
              title="Share"
            >
              <Share2 className="w-5 h-5 text-koji-teal" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white rounded-lg p-1 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('journey')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'journey'
                ? 'bg-koji-rust text-white'
                : 'text-koji-teal hover:bg-gray-50'
            }`}
          >
            Journey Timeline
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'details'
                ? 'bg-koji-rust text-white'
                : 'text-koji-teal hover:bg-gray-50'
            }`}
          >
            Batch Details
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'journey' ? (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-display text-koji-teal mb-2">
                  Product Journey
                </h1>
                <p className="text-koji-teal-light">
                  From food waste to fermented product in {batch.fermentation.duration} days
                </p>
              </div>
              <JourneyTimeline steps={batch.journey} currentStep={currentStepIndex} />
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-display text-koji-teal mb-2">
                  Batch Details
                </h1>
                <p className="text-koji-teal-light">
                  Complete information about batch #{batch.batchId}
                </p>
              </div>
              <BatchInfo batch={batch} />
            </div>
          )}
        </div>

        {/* Share Impact CTA */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="card bg-gradient-to-br from-koji-teal to-koji-teal-dark text-white text-center p-8">
            <h3 className="text-2xl font-bold mb-4">
              Share Your Impact
            </h3>
            <p className="mb-6 opacity-90">
              By choosing this product, you\'ve helped divert {batch.impact.wasteDiverted}kg of food waste
              and saved {batch.impact.co2Saved}kg of CO₂
            </p>
            <button
              onClick={handleShare}
              className="bg-white text-koji-teal px-6 py-3 rounded-lg font-medium hover:bg-koji-cream transition-colors inline-flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share This Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}