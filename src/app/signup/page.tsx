import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignupForm } from "./_components/signup-form";

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
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-[#1a172c] tracking-tight mb-2 uppercase">CREATE ACCOUNT</h1>
                        <p className="text-gray-500 text-sm">Register to get started</p>
                    </div>

                    <SignupForm />

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#1a172c] font-bold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}