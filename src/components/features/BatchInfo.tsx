'use client';

import { Batch } from '@/types';
import { formatDate, formatWeight, formatCO2, formatNumber } from '@/utils/formatters';
import {
  MapPin,
  Calendar,
  Recycle,
  Leaf,
  Award,
  Package,
  Timer,
  Droplets,
  Thermometer
} from 'lucide-react';
import Image from 'next/image';

interface BatchInfoProps {
  batch: Batch;
}

export default function BatchInfo({ batch }: BatchInfoProps) {
  const agingProgress = batch.aging
    ? (batch.aging.currentAge / batch.aging.targetAge) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-koji-teal mb-1">
              {batch.productName}
            </h1>
            <p className="text-sm text-koji-teal-light">
              Batch #{batch.batchId}
            </p>
          </div>
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${batch.status === 'ready' ? 'bg-green-100 text-green-800' :
              batch.status === 'aging' ? 'bg-green-100 text-green-800' :
              batch.status === 'fermentation' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'}
          `}>
            {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-koji-green" />
            <span className="text-sm">
              Produced: {formatDate(batch.productionDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-koji-green" />
            <span className="text-sm">
              Fermentation: {batch.fermentation.duration} days
            </span>
          </div>
        </div>
      </div>

      {/* Source Information */}
      <div className="card">
        <h2 className="text-lg font-semibold text-koji-teal mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-koji-green" />
          Source Partner
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-medium text-koji-teal">
              {batch.source.partnerName}
            </p>
            <p className="text-sm text-koji-teal-light">
              Copenhagen, Denmark
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {batch.source.wasteType.map((type) => (
              <span
                key={type}
                className="px-3 py-1 bg-koji-cream-dark rounded-full text-xs text-koji-teal"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Recycle className="w-4 h-4 text-koji-green" />
            <span>{formatWeight(batch.source.wasteWeight)} of food waste upcycled</span>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="impact-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Leaf className="w-5 h-5" />
          Environmental Impact
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">
              {formatCO2(batch.impact.co2Saved)}
            </p>
            <p className="text-sm text-white/80 mt-1">CO₂ Saved</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">
              {formatWeight(batch.impact.wasteDiverted)}
            </p>
            <p className="text-sm text-white/80 mt-1">Waste Diverted</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">
              {formatNumber(batch.impact.mealsEquivalent)}
            </p>
            <p className="text-sm text-white/80 mt-1">Meal Equivalent</p>
          </div>
        </div>
      </div>

      {/* Fermentation Details */}
      <div className="card">
        <h2 className="text-lg font-semibold text-koji-teal mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-koji-green" />
          Fermentation Process
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-koji-teal-light">Method</span>
            <span className="font-medium text-koji-teal">
              {batch.fermentation.method.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {batch.fermentation.temperature && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-koji-teal-light flex items-center gap-1">
                <Thermometer className="w-4 h-4" />
                Temperature
              </span>
              <span className="font-medium text-koji-teal">
                {batch.fermentation.temperature}°C
              </span>
            </div>
          )}

          {batch.fermentation.humidity && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-koji-teal-light flex items-center gap-1">
                <Droplets className="w-4 h-4" />
                Humidity
              </span>
              <span className="font-medium text-koji-teal">
                {batch.fermentation.humidity}%
              </span>
            </div>
          )}

          <div className="pt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-koji-teal-light">Start</span>
              <span className="text-sm">{formatDate(batch.fermentation.startDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-koji-teal-light">End</span>
              <span className="text-sm">{formatDate(batch.fermentation.endDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aging Process (for miso) */}
      {batch.aging && (
        <div className="card">
          <h2 className="text-lg font-semibold text-koji-teal mb-4 flex items-center gap-2">
            <Timer className="w-5 h-5 text-koji-green" />
            Aging Process
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-koji-teal-light">Current Age</span>
              <span className="font-medium text-koji-teal">
                {batch.aging.currentAge} / {batch.aging.targetAge} days
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-koji-green to-koji-green-light transition-all duration-300"
                style={{ width: `${Math.min(agingProgress, 100)}%` }}
              />
            </div>

            <p className="text-sm text-koji-teal-light">
              Expected completion: {formatDate(batch.aging.expectedEndDate)}
            </p>
          </div>
        </div>
      )}

      {/* Photo Gallery */}
      {batch.media.photos.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-koji-teal mb-4">
            Production Gallery
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {batch.media.photos.slice(0, 4).map((photo, index) => (
              <div key={index} className="relative h-32 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={photo}
                  alt={`Production photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {batch.certifications && batch.certifications.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-koji-teal mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-koji-green" />
            Certifications
          </h2>
          <div className="flex flex-wrap gap-2">
            {batch.certifications.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}