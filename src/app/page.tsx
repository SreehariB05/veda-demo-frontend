import LandingHeader from "./components/landing-header";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100">
      <LandingHeader />

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a172c] tracking-tight mb-4 uppercase">
          SECURE DOCUMENT VERIFICATION
        </h1>
        <p className="text-gray-500 mb-10 text-lg md:text-xl">
          Share Documents Using QR Code & Secure Links
        </p>

        <div className="flex items-center justify-center gap-6 mb-20 w-full">
          <Link href="/signup">
            <button className="bg-[#1e1b3a] text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-[#2d2952] transition-colors w-40">
              GET STARTED
            </button>
          </Link>
          <button className="bg-white text-black border-2 border-[#5235C5] px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors w-40">
            LEARN MORE
          </button>
        </div>

        {/* Feature Boxes */}
        <div className="flex flex-wrap justify-center gap-6 mb-24 w-full">
          <FeatureBox icon={<LockIcon className="w-8 h-8" />} label="Encryption" />
          <FeatureBox icon={<QrCodeIcon className="w-8 h-8" />} label="QR sharing" />
          <FeatureBox icon={<LockIcon className="w-8 h-8" />} label="MFA" />
          <FeatureBox icon={<FingerprintIcon className="w-8 h-8" />} label="BioMetrics" />
        </div>

        {/* How it works section */}
        <h2 className="text-xl font-bold text-[#1a172c] mb-12 uppercase tracking-wide">
          HOW VEDA WORKS
        </h2>

        <div className="flex items-center justify-center w-full flex-wrap md:flex-nowrap gap-2 md:gap-4 lg:gap-6">
          <Step icon={<UploadIcon className="w-8 h-8" />} label="Upload" />
          <Arrow />
          <Step icon={<UploadIcon className="w-8 h-8" />} label="Encrypt" />
          <Arrow />
          <Step icon={<UploadIcon className="w-8 h-8" />} label="UUID created" />
          <Arrow />
          <Step icon={<UploadIcon className="w-8 h-8" />} label="Share" />
          <Arrow />
          <Step icon={<UploadIcon className="w-8 h-8" />} label="Verify" />
        </div>
      </main>
    </div>
  );
}

function FeatureBox({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-[#eef1f6] rounded-2xl p-6 w-40 h-36 flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
      <div className="text-[#5235C5]">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </div>
  );
}

function Step({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-24 h-24 bg-[#eef1f6] rounded-full flex items-center justify-center text-gray-800 transition-transform hover:scale-105">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden md:block px-1 text-gray-400 mb-8">
      <svg width="48" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="0" y1="12" x2="24" y2="12"></line>
        <polyline points="18 6 24 12 18 18"></polyline>
      </svg>
    </div>
  );
}

// Icons
function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}

function QrCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1"></rect>
      <rect x="14" y="3" width="7" height="7" rx="1"></rect>
      <rect x="14" y="14" width="7" height="7" rx="1"></rect>
      <rect x="3" y="14" width="7" height="7" rx="1"></rect>
      <path d="M7 7h.01"></path>
      <path d="M18 7h.01"></path>
      <path d="M18 18h.01"></path>
      <path d="M7 18h.01"></path>
      <path d="M10 10h4v4h-4z"></path>
    </svg>
  );
}

function FingerprintIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10"></path>
      <path d="M5 12c0-3.866 3.134-7 7-7s7 3.134 7 7"></path>
      <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"></path>
      <path d="M12 16v-4"></path>
      <path d="M9 16c0-1.657 1.343-3 3-3s3 1.343 3 3"></path>
      <path d="M12 20v-4"></path>
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );
}
