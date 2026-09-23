"use client";

import DashSidebar from "../components/dash-sidebar";
import React, { useState } from "react";

interface ProfileData {
    user_name: string;
    user_id: string;
    name: string;
}

const PROFILE_DATA: ProfileData[] = [
    { user_name: "Placeholder", user_id: "placeholder@vedavault.com", name: "Placeholder" }
];

export default function ProfilePage() {
    const data = useState<ProfileData[]>(PROFILE_DATA);

    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans text-gray-800">
            {/* Top Header */}
            <header className="h-[73px] bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <ShieldIcon className="w-6 h-6 text-[#1a172c]" />
                    <span className="font-extrabold text-xl text-[#1a172c] tracking-wide">VEDA</span>
                </div>
                <div>
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                        <UserIcon className="w-5 h-5" />
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                <DashSidebar page="profile" />

                {/* Main Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[#1a172c] mb-1">My Profile</h1>
                        <p className="text-sm text-gray-500 font-medium">Manage identity proofs and verification keys</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Profile Info Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center h-full">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-full border-[2.5px] border-[#5a4fcf] flex items-center justify-center bg-[#f4f2ff]">
                                    <div className="w-1.5 h-1.5 bg-[#5a4fcf] rounded-full"></div>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-[#1a172c] mb-1">Placeholder</h2>
                            <p className="text-sm text-gray-500 font-medium mb-6">prasidh@vedavault.com</p>

                            <div className="inline-flex items-center gap-1.5 bg-[#e0f8e9] text-[#22c55e] px-4 py-1.5 rounded-full text-xs font-bold">
                                <CheckIcon className="w-3.5 h-3.5" />
                                Identity Verified
                            </div>
                        </div>

                        {/* Cryptographic Credentials Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-full">
                            <h2 className="text-lg font-bold text-[#1a172c] mb-6">Cryptographic Credentials</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                    <span className="text-sm text-gray-500 font-medium">Legal Name</span>
                                    <span className="text-sm font-bold text-[#1a172c]">Prasidh</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                    <span className="text-sm text-gray-500 font-medium">Decentralized ID (DID)</span>
                                    <span className="text-sm font-bold text-[#1a172c] text-right truncate max-w-[200px] sm:max-w-xs" title="did:veda:solana:8f921ea...">did:veda:solana:8f921ea...</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                    <span className="text-sm text-gray-500 font-medium">Assigned Vault Node</span>
                                    <span className="text-sm font-bold text-[#1a172c]">Vault Cluster #12 - Ireland</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                    <span className="text-sm text-gray-500 font-medium">Public Signature Key</span>
                                    <span className="text-sm font-bold text-[#1a172c] text-right truncate max-w-[200px] sm:max-w-xs" title="VedaPub_d9f1e...6c5e">VedaPub_d9f1e...6c5e</span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-sm text-gray-500 font-medium">Recovery Phase Configured</span>
                                    <span className="text-sm font-bold text-[#1a172c]">Yes (12 Words)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Icons
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
