"use client";

import DashSidebar from "../components/dash-sidebar";
import React, { useState, useMemo } from "react";
import Link from "next/link";

const initialDocuments = [
    { id: 1, type: "PDF", name: "Report_Q1", category: "Finance", size: "2.4 MB", expiry: "May 10, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]" },
    { id: 2, type: "IMG", name: "ID_Proof", category: "Personal", size: "1.1 MB", expiry: "Jun 15, 2026", status: "Active", statusColor: "bg-[#e0f2fe] text-[#3b82f6]" },
    { id: 3, type: "DOCX", name: "Contract_Signed", category: "Legal", size: "3.2 MB", expiry: "Jul 20, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]" },
    { id: 4, type: "PDF", name: "Report_Q2", category: "Finance", size: "2.4 MB", expiry: "May 10, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]" },
    { id: 5, type: "DOCX", name: "Contract_Signed", category: "Legal", size: "3.2 MB", expiry: "Jul 20, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]" },

];

export default function DocumentDetails() {
    const [filters, setFilters] = useState({
        type: "All",
        category: "All",
        status: "All",
    });

    const [sort, setSort] = useState<{ column: string | null, direction: 'asc' | 'desc' | null }>({
        column: null,
        direction: null,
    });

    const handleFilterChange = (column: string, value: string) => {
        setFilters(prev => ({ ...prev, [column]: value }));
    };

    const handleSortChange = (column: string, value: string) => {
        if (value === "None") {
            setSort({ column: null, direction: null });
        } else {
            setSort({ column, direction: value as 'asc' | 'desc' });
        }
    };

    const uniqueValues = (column: keyof typeof initialDocuments[0]) => {
        return ["All", ...Array.from(new Set(initialDocuments.map(doc => doc[column])))];
    };

    const processedDocuments = useMemo(() => {
        let docs = initialDocuments.filter(doc => {
            return (
                (filters.type === "All" || doc.type === filters.type) &&
                (filters.category === "All" || doc.category === filters.category) &&
                (filters.status === "All" || doc.status === filters.status)
            );
        });

        if (sort.column && sort.direction) {
            docs = [...docs].sort((a, b) => {
                const aVal = String(a[sort.column as keyof typeof a]);
                const bVal = String(b[sort.column as keyof typeof b]);
                
                if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return docs;
    }, [filters, sort]);

    const FilterSelect = ({ column, label }: { column: string, label: string }) => (
        <div className="flex flex-col items-start gap-1">
            <span>{label}</span>
            <select
                className="text-xs font-normal border border-gray-200 rounded px-1 py-0.5 bg-white text-gray-700 outline-none cursor-pointer"
                value={filters[column as keyof typeof filters]}
                onChange={(e) => handleFilterChange(column, e.target.value)}
            >
                {uniqueValues(column as keyof typeof initialDocuments[0]).map((val: any) => (
                    <option key={val} value={val}>{val}</option>
                ))}
            </select>
        </div>
    );

    const SortSelect = ({ column, label }: { column: string, label: string }) => (
        <div className="flex flex-col items-start gap-1">
            <span>{label}</span>
            <select
                className="text-xs font-normal border border-gray-200 rounded px-1 py-0.5 bg-white text-gray-700 outline-none cursor-pointer"
                value={sort.column === column && sort.direction ? sort.direction : "None"}
                onChange={(e) => handleSortChange(column, e.target.value)}
            >
                <option value="None">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );

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
                {/* @ts-ignore */}
                <DashSidebar page="document-details" />

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1a172c] mb-1">My Documents</h1>
                            <p className="text-sm text-gray-500 font-medium">Manage and verify uploaded files</p>
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

                    {/* Recent Documents Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 pt-5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs font-bold text-gray-500 border-b border-gray-100">
                                        <th className="pb-4 pl-2 align-top"><FilterSelect column="type" label="Type" /></th>
                                        <th className="pb-4 align-top"><SortSelect column="name" label="Name" /></th>
                                        <th className="pb-4 align-top"><FilterSelect column="category" label="Category" /></th>
                                        <th className="pb-4 align-top"><SortSelect column="size" label="Size" /></th>
                                        <th className="pb-4 align-top"><SortSelect column="expiry" label="Expiry" /></th>
                                        <th className="pb-4 align-top"><FilterSelect column="status" label="Status" /></th>
                                        <th className="pb-4 align-top pt-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-50">
                                    {processedDocuments.map(doc => (
                                        <TableRow
                                            key={doc.id}
                                            docType={doc.type}
                                            docName={doc.name}
                                            category={doc.category}
                                            size={doc.size}
                                            expiry={doc.expiry}
                                            status={doc.status}
                                            statusColor={doc.statusColor}
                                        />
                                    ))}
                                    {processedDocuments.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-gray-400">No documents found matching filters.</td>
                                        </tr>
                                    )}
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

function TableRow({ docType, docName, category, size, expiry, status, statusColor }: { docType: string, docName: string, category: string, size: string, expiry: string, status: string, statusColor: string }) {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="py-5 pl-2">
                <div className="text-xs font-semibold text-[#5a4fcf]">
                    {docType}
                </div>
            </td>
            <td className="py-5">
                <div className="flex items-center gap-4">
                    <div className="text-xs font-semibold text-gray-700">
                        {docName}
                    </div>
                </div>
            </td>
            <td className="py-5">
                <div className="text-xs font-semibold text-gray-500">
                    {category}
                </div>
            </td>
            <td className="py-5 font-bold text-gray-700 text-xs">{size}</td>
            <td className="py-5 font-bold text-gray-700 text-xs">{expiry}</td>
            <td className="py-5">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${statusColor}`}>
                    {status}
                </span>
            </td>
            <td className="py-5 text-indigo-600 text-xs font-semibold hover:underline cursor-pointer">
                View
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
