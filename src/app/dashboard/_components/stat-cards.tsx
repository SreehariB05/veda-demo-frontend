import React from "react";
import { DocFileIcon, SendIcon, ClockIcon, PulseIcon } from "@/lib/icons";

interface StatCardProps {
    icon: React.ReactNode;
    count: string | number;
    label: string;
}

export function StatCard({ icon, count, label }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#f4f2ff] flex items-center justify-center">
                {icon}
            </div>
            <span className="text-2xl font-bold text-[#1a172c]">{count}</span>
            <span className="text-xs font-semibold text-gray-400">{label}</span>
        </div>
    );
}

interface DashboardStatCardsProps {
    totalDocuments?: number;
    sharedToday?: number;
    expiringSoon?: number;
    recentActivity?: number;
    isLoading?: boolean;
}

export function DashboardStatCards({
    totalDocuments = 0,
    sharedToday = 0,
    expiringSoon = 0,
    recentActivity = 0,
    isLoading = false,
}: DashboardStatCardsProps) {
    const display = (n: number) => (isLoading ? "—" : String(n));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<DocFileIcon className="text-[#5a4fcf] w-6 h-6" />} count={display(totalDocuments)} label="Total Documents" />
            <StatCard icon={<SendIcon className="text-[#5a4fcf] w-6 h-6" />} count={display(sharedToday)} label="Shared Today" />
            <StatCard icon={<ClockIcon className="text-[#5a4fcf] w-6 h-6" />} count={display(expiringSoon)} label="Expiring Soon" />
            <StatCard icon={<PulseIcon className="text-[#5a4fcf] w-6 h-6" />} count={display(recentActivity)} label="Notifications" />
        </div>
    );
}
