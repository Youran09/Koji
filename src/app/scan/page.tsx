'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QRScanner from '@/components/features/QRScanner';
import { Package2, ShoppingBag, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = (data: string) => {
    setScanResult(data);

    // Parse the QR code data to get batch ID
    const batchMatch = data.match(/batch\/([\w-]+)/);

    if (batchMatch && batchMatch[1]) {
      router.push(`/batch/${batchMatch[1]}`);
    } else {
      setError('Invalid QR code. Please scan a Koji Copenhagen product.');
    }
  };

  const handleError = (error: string) => {
    setError(error);
  };

  return (
    <div className="space-y-6">
      {/* Scanner Section */}
      <section className="container pt-4">
        <div className="glass-scanner space-y-6">
          <QRScanner onScan={handleScan} onError={handleError} />

          {error && (
            <div className="glass-card bg-red-50/20 border-red-300/30">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="glass-btn-ghost mt-2"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="container space-y-4">
        <h2 className="heading-md text-center">How to Scan</h2>

        <div className="space-y-3">
          {[
            {
              step: '1️⃣',
              title: 'Find the QR Code',
              description: 'Look for the QR code on your product packaging',
              icon: '🔍',
            },
            {
              step: '2️⃣',
              title: 'Allow Camera Access',
              description: 'Tap "Start Scanning" and allow camera permissions',
              icon: '📱',
            },
            {
              step: '3️⃣',
              title: 'Scan the Code',
              description: 'Position the QR code within the scanning frame',
              icon: '📸',
            },
            {
              step: '4️⃣',
              title: 'Explore the Journey',
              description: 'See your product\'s story and environmental impact',
              icon: '🌱',
            },
          ].map((item, index) => (
            <div key={index} className="glass-list-item">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-koji-green to-koji-green-dark rounded-xl flex items-center justify-center">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-koji-green to-koji-green-dark rounded-full flex items-center justify-center">
                      <span className="text-base">{item.step}</span>
                    </div>
                    <h3 className="heading-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Recent Scans */}
      <section className="container space-y-4">
        <h2 className="heading-md text-center">Recent Discoveries</h2>
        <p className="text-base text-center">See what others have found</p>

        <div className="space-y-3">
          <div className="glass-list-item">
            <div className="flex justify-between items-start mb-2">
              <h4 className="heading-sm">Barley Miso - 6 Month</h4>
              <span className="badge badge-green">Just scanned</span>
            </div>
            <p className="text-sm mb-2">From Fjora CPH • 25kg waste diverted</p>
            <div className="flex gap-2">
              <span className="text-xs bg-koji-cream-dark px-2 py-1 rounded">Organic</span>
              <span className="text-xs bg-koji-cream-dark px-2 py-1 rounded">Zero Waste</span>
            </div>
          </div>

          <div className="glass-list-item">
            <div className="flex justify-between items-start mb-2">
              <h4 className="heading-sm">Fresh Koji Starter</h4>
              <span className="badge badge-teal">2 hours ago</span>
            </div>
            <p className="text-sm mb-2">From Hart Bakery • 15kg waste diverted</p>
            <div className="flex gap-2">
              <span className="text-xs bg-koji-cream-dark px-2 py-1 rounded">Fresh</span>
              <span className="text-xs bg-koji-cream-dark px-2 py-1 rounded">Local</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}