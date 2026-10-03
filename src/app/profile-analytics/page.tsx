import DashSidebar from "../components/dash-sidebar";
import DashHeader from "../components/dash-header";
import { AnalyticsOverview } from "./_components/analytics-overview";
import React from "react";

export default function ProfileAnalyticsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans">
            <DashHeader />
            <div className="flex flex-1 overflow-hidden">
                <DashSidebar page="profile-analytics" />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[#1a172c] mb-1">Analytics</h1>
                        <p className="text-sm text-gray-500 font-medium">Your document activity and verification stats</p>
                    </div>
                    <AnalyticsOverview />
                </main>
            </div>
        </div>
    );
}
