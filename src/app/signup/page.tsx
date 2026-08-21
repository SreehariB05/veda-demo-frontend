import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Signup() {
    return (
        <div className="min-h-screen bg-[#fafbfc] font-sans text-gray-900 flex flex-col selection:bg-indigo-100">
            {/* Header */}
            <header className="flex items-center px-8 py-5 border-b border-gray-200 bg-white shadow-sm">
                <Link href="/" className="flex items-center gap-4">
                    <Image
                        src="/vedalogo.svg"
                        alt="Veda Logo"
                        width={48}
                        height={48}
                        className="w-auto h-10"
                    />
                    <span className="font-extrabold text-xl text-[#1a172c] tracking-wide">VEDA</span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-md p-10 pt-12 pb-14 border border-gray-100">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold text-[#1a172c] tracking-tight mb-2 uppercase">CREATE ACCOUNT</h1>
                        <p className="text-gray-500 text-sm">Sign up to get started</p>
                    </div>

                    <form className="space-y-4">
                        {/* Full Name */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                                placeholder="Full Name"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="email"
                                className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                                placeholder="Email"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <PhoneIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="tel"
                                className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                                placeholder="Phone Number"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="password"
                                className="block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                                placeholder="Password"
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                >
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="password"
                                className="block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                                placeholder="Confirm Password"
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                >
                                </button>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-[#1e1b3a] text-white py-4 rounded-lg font-bold text-sm hover:bg-[#2d2952] transition-colors"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

// SVGs for the input icons
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
    );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    );
}