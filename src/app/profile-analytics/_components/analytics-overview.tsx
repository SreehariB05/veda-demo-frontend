import React from "react";
import { PulseIcon } from "@/lib/icons";

export function AnalyticsOverview() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#f4f2ff] flex items-center justify-center">
                <PulseIcon className="w-8 h-8 text-[#5a4fcf]" />
            </div>
            <h2 className="text-lg font-bold text-[#1a172c]">Profile Analytics</h2>
            <p className="text-sm text-gray-400 max-w-xs">
                View detailed analytics for your document activity, verification history, and access logs.
            </p>
        </div>
    );
}
