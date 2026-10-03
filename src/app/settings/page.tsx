import DashSidebar from "../components/dash-sidebar";
import DashHeader from "../components/dash-header";
import { SettingsPanel } from "./_components/settings-panel";
import React from "react";

export default function SettingsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans">
            <DashHeader />
            <div className="flex flex-1 overflow-hidden">
                <DashSidebar page="settings" />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[#1a172c] mb-1">Settings</h1>
                        <p className="text-sm text-gray-500 font-medium">Manage your account preferences and security</p>
                    </div>
                    <SettingsPanel />
                </main>
            </div>
        </div>
    );
}
