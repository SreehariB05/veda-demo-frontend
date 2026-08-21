import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Login() {
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
                        <h1 className="text-2xl font-bold text-[#1a172c] tracking-tight mb-2 uppercase">WELCOME BACK</h1>
                        <p className="text-gray-500 text-sm">Log in to your account</p>
                    </div>

                    <form className="space-y-4">
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

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-[#1e1b3a] text-white py-4 rounded-lg font-bold text-sm hover:bg-[#2d2952] transition-colors"
                            >
                                Login
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-[#1a172c] font-bold hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

// SVGs for the input icons
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
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