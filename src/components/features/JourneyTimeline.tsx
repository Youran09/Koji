'use client';

import { motion } from 'framer-motion';
import { JourneyStep } from '@/types';
import { formatDate, calculateDaysAgo } from '@/utils/formatters';
import {
  Package,
  Wheat,
  Timer,
  Award,
  CheckCircle,
  Circle,
  Clock
} from 'lucide-react';
import Image from 'next/image';

interface JourneyTimelineProps {
  steps: JourneyStep[];
  currentStep?: number;
}

const getStepIcon = (stepTitle: string) => {
  if (stepTitle.toLowerCase().includes('collect')) return Package;
  if (stepTitle.toLowerCase().includes('inoculat')) return Wheat;
  if (stepTitle.toLowerCase().includes('ferment')) return Timer;
  if (stepTitle.toLowerCase().includes('aging')) return Clock;
  if (stepTitle.toLowerCase().includes('ready')) return Award;
  return Circle;
};

export default function JourneyTimeline({ steps, currentStep = 0 }: JourneyTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gray-200"></div>

      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = getStepIcon(step.title);
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-4"
            >
              <div className="relative z-10">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  ${isActive
                    ? 'bg-koji-rust text-white'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }
                  ${isCurrent ? 'ring-4 ring-koji-rust/20' : ''}
                  transition-all duration-300
                `}>
                  {isActive ? (
                    step.status === 'completed' ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <Icon className="w-8 h-8" />
                    )
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </div>
              </div>

              <div className="flex-1 pb-8">
                <div className={`
                  card
                  ${isCurrent ? 'border-koji-rust shadow-lg' : ''}
                  transition-all duration-300
                `}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-koji-teal">
                        Day {step.day}: {step.title}
                      </h3>
                      <p className="text-sm text-koji-teal-light">
                        {formatDate(step.date)} • {calculateDaysAgo(step.date)} days ago
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="px-3 py-1 bg-koji-rust text-white text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>

                  {step.photo && (
                    <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={step.photo}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}