import React from "react";
import Link from "next/link";
import { LockIcon, QrCodeIcon, FingerprintIcon, UploadIcon } from "@/lib/icons";

export function HeroSection() {
    return (
        <section className="max-w-6xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a172c] tracking-tight mb-4 uppercase">
                SECURE DOCUMENT VERIFICATION
            </h1>
            <p className="text-gray-500 mb-10 text-lg md:text-xl">
                Share Documents Using QR Code &amp; Secure Links
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

            {/* How it works */}
            <h2 className="text-xl font-bold text-[#1a172c] mb-12 uppercase tracking-wide">HOW VEDA WORKS</h2>
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
        </section>
    );
}

function FeatureBox({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="bg-[#eef1f6] rounded-2xl p-6 w-40 h-36 flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
            <div className="text-[#5235C5]">{icon}</div>
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
                <line x1="0" y1="12" x2="24" y2="12" />
                <polyline points="18 6 24 12 18 18" />
            </svg>
        </div>
    );
}
