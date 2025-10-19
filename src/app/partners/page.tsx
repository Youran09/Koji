'use client';

import { useState } from 'react';
import PartnerMap from '@/components/features/PartnerMap';
import { Partner } from '@/types';
import { Search, Filter } from 'lucide-react';

// Mock data - replace with Firebase
const mockPartners: Partner[] = [
  {
    id: 'fjora-cph',
    name: 'Fjora CPH',
    type: 'restaurant',
    location: {
      address: 'Wilders Plads 12, Copenhagen',
      lat: 55.6761,
      lng: 12.5683,
    },
    wasteTypes: ['bread', 'vegetables', 'rice'],
    totalWasteUpcycled: 450,
    description: 'Nordic cuisine restaurant committed to sustainability',
    website: 'https://fjoracph.dk',
    sustainabilityStory: 'Zero waste kitchen philosophy with local sourcing',
    joinedDate: new Date('2024-03-15'),
  },
  {
    id: 'hart-bakery',
    name: 'Hart Bakery',
    type: 'bakery',
    location: {
      address: 'Gammel Kongevej 109, Copenhagen',
      lat: 55.6745,
      lng: 12.5492,
    },
    wasteTypes: ['bread', 'pastries'],
    totalWasteUpcycled: 320,
    description: 'Artisan bakery with sourdough specialty',
    website: 'https://hartbageri.dk',
    joinedDate: new Date('2024-04-20'),
  },
  {
    id: 'mirabelle',
    name: 'Mirabelle',
    type: 'bakery',
    location: {
      address: 'Guldbergsgade 29, Copenhagen',
      lat: 55.6935,
      lng: 12.5525,
    },
    wasteTypes: ['bread', 'pastries', 'croissants'],
    totalWasteUpcycled: 280,
    description: 'French-Danish bakery and café',
    website: 'https://mirabelle.dk',
    joinedDate: new Date('2024-05-10'),
  },
  {
    id: 'amass',
    name: 'Amass',
    type: 'restaurant',
    location: {
      address: 'Refshalevej 153, Copenhagen',
      lat: 55.6922,
      lng: 12.6095,
    },
    wasteTypes: ['vegetables', 'grains', 'fruits'],
    totalWasteUpcycled: 520,
    description: 'Zero waste restaurant and sustainability pioneer',
    website: 'https://amassrestaurant.com',
    sustainabilityStory: 'Leading the way in circular economy dining',
    joinedDate: new Date('2024-02-01'),
  },
];

export default function PartnersPage() {
  const [partners] = useState<Partner[]>(mockPartners);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const filteredPartners = partners.filter(partner => {
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          partner.wasteTypes.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const totalWaste = partners.reduce((sum, p) => sum + p.totalWasteUpcycled, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-koji-cream via-koji-cream to-koji-cream-dark py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="heading-xl mb-6">
            Our Partner <span className="gradient-text">Network</span>
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Copenhagen's finest restaurants and bakeries committed to reducing food waste
            through koji fermentation
          </p>
          <p className="text-sm max-w-2xl mx-auto text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2 mt-4">
            ⚠️ (Prototype MVP - AI Generated Demo - All numbers and data are not real)
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="card card-content text-center hover-lift interactive-scale animate-slide-up">
            <div className="text-3xl font-bold gradient-text mb-2">
              {partners.length}
            </div>
            <div className="text-sm text-secondary font-medium">Active Partners</div>
          </div>
          <div className="card card-content text-center hover-lift interactive-scale animate-slide-up animation-delay-100">
            <div className="text-3xl font-bold gradient-text mb-2">
              {totalWaste}kg
            </div>
            <div className="text-sm text-secondary font-medium">Waste Upcycled</div>
          </div>
          <div className="card card-content text-center hover-lift interactive-scale animate-slide-up animation-delay-200">
            <div className="text-3xl font-bold gradient-text mb-2">
              {Math.round(totalWaste * 0.5)}kg
            </div>
            <div className="text-sm text-secondary font-medium">CO₂ Saved</div>
          </div>
          <div className="card card-content text-center hover-lift interactive-scale animate-slide-up animation-delay-300">
            <div className="text-3xl font-bold gradient-text mb-2">
              {Math.round(totalWaste * 4)}
            </div>
            <div className="text-sm text-secondary font-medium">Meals Created</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card card-content mb-8 animate-slide-up animation-delay-500">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="input-group">
                <Search className="input-icon" />
                <input
                  type="text"
                  placeholder="Search partners or waste types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-with-icon"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedType('all')}
                className={`btn btn-small interactive-scale ${
                  selectedType === 'all'
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('restaurant')}
                className={`btn btn-small interactive-scale ${
                  selectedType === 'restaurant'
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}
              >
                Restaurants
              </button>
              <button
                onClick={() => setSelectedType('bakery')}
                className={`btn btn-small interactive-scale ${
                  selectedType === 'bakery'
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}
              >
                Bakeries
              </button>
              <button
                onClick={() => setSelectedType('cafe')}
                className={`btn btn-small interactive-scale ${
                  selectedType === 'cafe'
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}
              >
                Cafés
              </button>
            </div>
          </div>
        </div>

        {/* Map and List */}
        <PartnerMap
          partners={filteredPartners}
          selectedPartnerId={selectedPartner?.id}
          onPartnerSelect={setSelectedPartner}
        />

        {/* Partner Spotlight */}
        {selectedPartner && (
          <div className="mt-12">
            <div className="relative overflow-hidden rounded-3xl animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-koji-teal via-koji-teal-dark to-koji-green opacity-90"></div>
              <div className="relative glass-effect text-white p-8 border border-white/20">
                <h2 className="heading-lg text-white mb-4">
                  {selectedPartner.name}
                </h2>
                <p className="text-lg mb-4 opacity-90 leading-relaxed">
                  {selectedPartner.description}
                </p>
                {selectedPartner.sustainabilityStory && (
                  <p className="mb-6 text-base opacity-80 leading-relaxed">
                    {selectedPartner.sustainabilityStory}
                  </p>
                )}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-effect p-4 rounded-xl border border-white/20">
                    <div className="text-sm opacity-70 mb-2">Total Impact</div>
                    <div className="text-3xl font-bold">
                      {selectedPartner.totalWasteUpcycled}kg
                    </div>
                  </div>
                  <div className="glass-effect p-4 rounded-xl border border-white/20">
                    <div className="text-sm opacity-70 mb-2">Waste Types</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedPartner.wasteTypes.map(type => (
                        <span key={type} className="badge badge-green">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="glass-effect p-4 rounded-xl border border-white/20">
                    <div className="text-sm opacity-70 mb-2">Partner Since</div>
                    <div className="text-xl font-semibold">
                      {selectedPartner.joinedDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Join CTA */}
        <div className="mt-16 text-center">
          <div className="relative overflow-hidden rounded-3xl max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-koji-green via-koji-green-dark to-koji-teal opacity-90"></div>
            <div className="relative glass-effect p-12 border border-white/20 animate-scale-in">
              <h2 className="heading-lg text-white mb-6">
                Become a Partner
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Join Copenhagen's circular economy. Transform your food waste into valuable
                fermented products while reducing your environmental impact.
              </p>
              <a
                href="mailto:partners@kojicopenhagen.com"
                className="btn btn-glass btn-large hover-lift interactive-scale inline-flex"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}