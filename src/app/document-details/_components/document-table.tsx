import React from "react";
import Link from "next/link";
import type { Document } from "@/lib/types/api.types";

// ─── Table Row ─────────────────────────────────────────────────────────────

function statusColor(status: string): string {
    switch (status) {
        case "verified": return "bg-[#e0f8e9] text-[#22c55e]";
        case "pending":  return "bg-[#fef9c3] text-[#ca8a04]";
        case "rejected": return "bg-[#fee2e2] text-[#ef4444]";
        default:         return "bg-gray-100 text-gray-500";
    }
}

export function DocumentTableRow({ doc }: { doc: Document }) {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="py-5 pl-2">
                <div className="w-10 h-9 rounded-lg bg-indigo-50 text-[#5a4fcf] font-bold text-xs flex items-center justify-center">
                    {doc.type.slice(0, 3).toUpperCase()}
                </div>
            </td>
            <td className="py-5">
                <div className="text-xs font-semibold text-gray-700">{doc.title}</div>
            </td>
            <td className="py-5">
                <div className="text-xs font-semibold text-gray-500 capitalize">{doc.category}</div>
            </td>
            <td className="py-5 text-xs font-semibold text-gray-500 capitalize">{doc.subcategory}</td>
            <td className="py-5 font-bold text-gray-700 text-xs">
                {doc.expiry_date
                    ? new Date(doc.expiry_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })
                    : "—"}
            </td>
            <td className="py-5">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize ${statusColor(doc.status)}`}>
                    {doc.status}
                </span>
            </td>
            <td className="py-5 text-indigo-600 text-xs font-semibold hover:underline cursor-pointer">
                <Link href={`/document-details/${doc.id}`}>View</Link>
            </td>
        </tr>
    );
}

// ─── Filter / Sort selects ──────────────────────────────────────────────────

interface FilterSelectProps {
    column: string;
    label: string;
    options: string[];
    value: string;
    onChange: (column: string, value: string) => void;
}

export function FilterSelect({ column, label, options, value, onChange }: FilterSelectProps) {
    return (
        <div className="flex flex-col items-start gap-1">
            <span>{label}</span>
            <select
                className="text-xs font-normal border border-gray-200 rounded px-1 py-0.5 bg-white text-gray-700 outline-none cursor-pointer"
                value={value}
                onChange={(e) => onChange(column, e.target.value)}
            >
                {options.map((val) => (
                    <option key={val} value={val}>{val}</option>
                ))}
            </select>
        </div>
    );
}

interface SortSelectProps {
    column: string;
    label: string;
    currentColumn: string | null;
    currentDirection: "asc" | "desc" | null;
    onChange: (column: string, value: string) => void;
}

export function SortSelect({ column, label, currentColumn, currentDirection, onChange }: SortSelectProps) {
    return (
        <div className="flex flex-col items-start gap-1">
            <span>{label}</span>
            <select
                className="text-xs font-normal border border-gray-200 rounded px-1 py-0.5 bg-white text-gray-700 outline-none cursor-pointer"
                value={currentColumn === column && currentDirection ? currentDirection : "None"}
                onChange={(e) => onChange(column, e.target.value)}
            >
                <option value="None">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
}
