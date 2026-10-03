import LandingHeader from "./components/landing-header";
import { HeroSection } from "./_components/hero-section";
import { AuthRedirectHandler } from "./_components/auth-redirect-handler";
import React from "react";

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100">
            <AuthRedirectHandler />
            <LandingHeader />
            <main>
                <HeroSection />
            </main>
        </div>
    );
}
