import DashSidebar from "../components/dash-sidebar";
import React from "react";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans">
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
                <DashSidebar page="dashboard" />

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1a172c] mb-1">Hello, PlaceholderName</h1>
                            <p className="text-sm text-gray-500 font-medium">Welcome to VEDA Dashboard</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search documents..."
                                className="w-full bg-[#f3f4f6] border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard icon={<DocFileIcon className="text-[#5a4fcf] w-6 h-6" />} count="placeholder" label="Total Documents" />
                        <StatCard icon={<SendIcon className="text-[#5a4fcf] w-6 h-6" />} count="placeholder" label="Shared Today" />
                        <StatCard icon={<ClockIcon className="text-[#5a4fcf] w-6 h-6" />} count="placeholder" label="Expiring Soon" />
                        <StatCard icon={<PulseIcon className="text-[#5a4fcf] w-6 h-6" />} count="placeholder" label="Recent Activity" />
                    </div>

                    {/* Recent Documents Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 pt-5">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-[#1a172c]">Recent Documents</h2>
                            <Link href="/document-details">
                                <button
                                    className="text-sm font-semibold text-[#5a4fcf] hover:text-[#4239a0] transition-colors"
                                >
                                    View All
                                </button>
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs font-bold text-gray-500 border-b border-gray-100">
                                        <th className="pb-4 pl-2">Document Name</th>
                                        <th className="pb-4">Category</th>
                                        <th className="pb-4">Expiry</th>
                                        <th className="pb-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-50">
                                    <TableRow docType=".placeholder" docName="placeholder.type" category="placeholder" expiry="placeholder" status="placeholder" statusColor="bg-[#e0f8e9] text-[#22c55e]" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Sub components
function StatCard({ icon, count, label }: { icon: React.ReactNode; label: string; count: string }) {
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

function TableRow({ docType, docName, category, expiry, status, statusColor }: { docType: string, docName: string, category: string, expiry: string, status: string, statusColor: string }) {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="py-5 pl-2">
                <div className="flex items-center gap-4">
                    <div className="text-xs font-semibold text-[#5a4fcf]">
                        {docType}
                    </div>
                    <div className="text-xs font-semibold text-gray-400">
                        {docName}
                    </div>
                </div>
            </td>
            <td className="py-5">
                <div className="text-xs font-semibold text-gray-400">
                    {category}
                </div>
            </td>
            <td className="py-5 font-bold text-gray-700 text-xs">{expiry}</td>
            <td className="py-5">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${statusColor}`}>
                    {status}
                </span>
            </td>
        </tr>
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

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function DocFileIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function PulseIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    );
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
        </svg>
    );
}
