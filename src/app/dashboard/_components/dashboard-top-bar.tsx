import React from "react";
import { SearchIcon } from "@/lib/icons";

interface DashboardTopBarProps {
    userName?: string;
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export function DashboardTopBar({ userName = "User", searchQuery, onSearchChange }: DashboardTopBarProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[#1a172c] mb-1">Hello, {userName}</h1>
                <p className="text-sm text-gray-500 font-medium">Welcome to VEDA Dashboard</p>
            </div>
            <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="w-4 h-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search documents..."
                    className="w-full bg-[#f3f4f6] border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
                />
            </div>
        </div>
    );
}
