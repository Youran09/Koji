'use client';

import { useState } from 'react';
import { Partner } from '@/types';
import { formatWeight } from '@/utils/formatters';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import Image from 'next/image';

interface PartnerMapProps {
  partners: Partner[];
  selectedPartnerId?: string;
  onPartnerSelect?: (partner: Partner) => void;
}

// Partner location data for the Google Maps image
// Positioned based on real Copenhagen locations
const partnerMapPositions: Record<string, { x: number; y: number }> = {
  'fjora-cph': { x: 320, y: 180 },     // Wilders Plads area (central Copenhagen)
  'hart-bakery': { x: 280, y: 220 },   // Frederiksberg area (Gammel Kongevej)
  'mirabelle': { x: 350, y: 160 },     // Nørrebro area (Guldbergsgade)
  'amass': { x: 450, y: 320 },         // Refshaleøen area (eastern Copenhagen)
};

export default function PartnerMap({
  partners,
  selectedPartnerId,
  onPartnerSelect,
}: PartnerMapProps) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(selectedPartner?.id === partner.id ? null : partner);
    if (onPartnerSelect) {
      onPartnerSelect(partner);
    }
  };


  return (
    <div className="space-y-6">
      {/* Copenhagen Map Visualization */}
      <div className="card p-0 overflow-hidden rounded-3xl animate-scale-in">
        <div className="relative">
          <Image
            src="/copenhagen-google-map.jpg"
            alt="Copenhagen Partner Network - Google Maps"
            width={515}
            height={515}
            className="w-full h-auto"
          />

          {/* Interactive Partner Markers */}
          {partners.map((partner) => {
            const position = partnerMapPositions[partner.id];
            if (!position) return null;

            const isSelected = selectedPartner?.id === partner.id;
            const isHovered = hoveredPartner === partner.id;

            return (
              <div
                key={partner.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${(position.x / 515) * 100}%`,
                  top: `${(position.y / 515) * 100}%`,
                }}
                onClick={() => handlePartnerClick(partner)}
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                <div className={`
                  w-10 h-10 rounded-full border-3 transition-all duration-300 shadow-lg
                  ${isSelected || isHovered ? 'scale-125' : 'scale-100'}
                  ${isSelected ? 'bg-koji-rust border-white shadow-xl' : 'bg-white border-koji-rust'}
                  hover:scale-110 interactive-scale
                `}>
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-koji-rust' : 'bg-koji-rust'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      isSelected ? 'bg-white' : 'bg-white'
                    }`}></div>
                  </div>
                </div>

                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                    <div className="glass-effect px-3 py-2 rounded-lg border border-white/20 text-white text-sm font-medium whitespace-nowrap">
                      {partner.name}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Partner Info */}
      {selectedPartner && (
        <div className="card card-content animate-slide-up">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-koji-rust to-koji-rust-dark rounded-2xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="heading-md text-koji-teal mb-2">
                {selectedPartner.name}
              </h3>
              <p className="text-secondary mb-3 leading-relaxed">
                {selectedPartner.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary font-medium mb-2">Location</p>
                  <p className="text-sm">{selectedPartner.location.address}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary font-medium mb-2">Impact</p>
                  <p className="font-bold gradient-text text-lg">
                    {formatWeight(selectedPartner.totalWasteUpcycled)} upcycled
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-secondary font-medium mb-2">Waste Types</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.wasteTypes.map((type) => (
                    <span key={type} className="badge badge-teal">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPartner.website && (
                <div className="mt-4">
                  <a
                    href={selectedPartner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-small inline-flex"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Partner List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map((partner, index) => (
          <div
            key={partner.id}
            className={`
              card card-hover card-content cursor-pointer hover-lift interactive-scale
              animate-slide-up animation-delay-${(index + 1) * 100}
              ${selectedPartnerId === partner.id || selectedPartner?.id === partner.id ? 'border-koji-rust shadow-lg' : ''}
            `}
            onClick={() => handlePartnerClick(partner)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="heading-sm text-koji-teal mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-secondary font-medium">
                  {partner.type.charAt(0).toUpperCase() + partner.type.slice(1)}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-koji-rust to-koji-rust-dark rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </div>

            <p className="text-sm text-secondary mb-4 leading-relaxed">
              {partner.location.address}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {partner.wasteTypes.slice(0, 3).map((type) => (
                <span
                  key={type}
                  className="badge badge-teal"
                >
                  {type}
                </span>
              ))}
              {partner.wasteTypes.length > 3 && (
                <span className="badge badge-rust">
                  +{partner.wasteTypes.length - 3} more
                </span>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary font-medium">Total Impact</span>
              <span className="font-bold gradient-text text-lg">
                {formatWeight(partner.totalWasteUpcycled)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}