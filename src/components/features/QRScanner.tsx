'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, X, Zap, Flashlight } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

export default function QRScanner({ onScan, onError }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "qr-scanner",
        {
          fps: 10,
          qrbox: { width: 280, height: 280 },
          aspectRatio: 1,
          formatsToSupport: ['QR_CODE'],
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: false,
          defaultZoomValueIfSupported: 1,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          onScan(decodedText);
          setIsScanning(false);
          if (scannerRef.current) {
            scannerRef.current.clear();
            scannerRef.current = null;
          }
        },
        (error) => {
          // Suppress frequent scanning errors - only log unexpected errors
        }
      );

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {
          // Silently handle cleanup errors
        });
        scannerRef.current = null;
      }
    };
  }, [isScanning, onScan]);

  const startScanning = async () => {
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      setIsScanning(true);
    } catch (error) {
      setHasPermission(false);
      onError?.('Camera access denied. Please allow camera permissions and try again.');
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
  };

  if (!isScanning) {
    return (
      <div className="text-center space-y-6">
        {/* Scanner Preview */}
        <div className="qr-scanner-container mx-auto">
          <div className="aspect-square bg-gradient-to-br from-koji-teal to-koji-teal-dark rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="qr-scanner-overlay">
              <div className="qr-scanner-corners top-left"></div>
              <div className="qr-scanner-corners top-right"></div>
              <div className="qr-scanner-corners bottom-left"></div>
              <div className="qr-scanner-corners bottom-right"></div>
            </div>
            <Camera className="w-16 h-16 text-white/60" />
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h3 className="heading-md text-center">Scan Your Product</h3>
          <p className="text-base text-center max-w-sm mx-auto">
            Point your camera at the QR code on your Koji Copenhagen product to trace its journey
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={startScanning}
            className="btn btn-primary btn-large btn-full"
          >
            <Camera className="w-6 h-6" />
            Start Scanning
          </button>

          {hasPermission === false && (
            <div className="text-center">
              <p className="text-sm text-red-600">
                Camera access is required for scanning
              </p>
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="card card-content space-y-3">
          <h4 className="heading-sm text-center">Scanning Tips</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-koji-green/10 rounded-full flex items-center justify-center">
                <span className="text-koji-green text-xs font-bold">1️⃣</span>
              </div>
              <span>Hold steady and ensure good lighting</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-koji-green/10 rounded-full flex items-center justify-center">
                <span className="text-koji-green text-xs font-bold">2️⃣</span>
              </div>
              <span>Position QR code within the frame</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-koji-green/10 rounded-full flex items-center justify-center">
                <span className="text-koji-green text-xs font-bold">3️⃣</span>
              </div>
              <span>Wait for automatic detection</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Scanner Header */}
      <div className="flex justify-between items-center">
        <h3 className="heading-sm">Scanning...</h3>
        <button
          onClick={stopScanning}
          className="btn btn-ghost btn-icon"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scanner Container */}
      <div className="relative">
        <div id="qr-scanner" className="qr-scanner-container"></div>

        {/* Overlay with scanning animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-4 border-2 border-koji-green rounded-xl">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-koji-green animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center space-y-2">
        <p className="text-sm">Position the QR code within the frame</p>
        <p className="text-xs text-gray-500">
          Make sure the code is clear and well-lit
        </p>
      </div>

      {/* Demo Button */}
      <div className="text-center">
        <button
          onClick={() => onScan('https://koji.cph/batch/KC2025-001')}
          className="btn btn-ghost btn-small"
        >
          <Zap className="w-4 h-4" />
          Try Demo Code
        </button>
      </div>
    </div>
  );
}