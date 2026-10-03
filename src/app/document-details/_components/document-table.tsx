"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Document } from "@/lib/types/api.types";
import { TrashIcon, DownloadIcon, ShieldIcon } from "@/lib/icons";

// ─── Status Color Helper ───────────────────────────────────────────────────

function statusColor(status: string): string {
    switch (status) {
        case "verified":
            return "bg-[#e0f8e9] text-[#22c55e] border border-emerald-200";
        case "pending":
            return "bg-[#fef9c3] text-[#ca8a04] border border-amber-200";
        case "rejected":
            return "bg-[#fee2e2] text-[#ef4444] border border-rose-200";
        default:
            return "bg-gray-100 text-gray-500";
    }
}

// ─── Table Row Component ───────────────────────────────────────────────────

interface DocumentTableRowProps {
    doc: Document;
    isDeleting: boolean;
    isDownloading: boolean;
    onDelete: (id: string, title: string) => void;
    onDownload: (id: string, title: string) => void;
}

export function DocumentTableRow({
    doc,
    isDeleting,
    isDownloading,
    onDelete,
    onDownload,
}: DocumentTableRowProps) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <tr className="hover:bg-gray-50/60 transition-colors group">
            {/* Type Icon Badge */}
            <td className="py-4 pl-3">
                <div className="w-10 h-9 rounded-xl bg-indigo-50 text-[#5a4fcf] font-bold text-xs flex items-center justify-center uppercase tracking-wide">
                    {doc.type ? doc.type.slice(0, 3) : "DOC"}
                </div>
            </td>

            {/* Document Title & ID */}
            <td className="py-4">
                <Link
                    href={`/document-details/${doc.id}`}
                    className="text-xs font-bold text-[#1a172c] hover:text-[#5a4fcf] transition-colors block"
                >
                    {doc.title}
                </Link>
                <span className="text-[10px] text-gray-400 font-mono">
                    ID: {doc.id.slice(0, 8)}...
                </span>
            </td>

            {/* Category */}
            <td className="py-4">
                <span className="text-xs font-medium text-gray-700 capitalize">
                    {doc.category?.replace(/_/g, " ") || "Other"}
                </span>
            </td>

            {/* Subcategory */}
            <td className="py-4">
                <span className="text-xs font-medium text-gray-500 capitalize px-2 py-0.5 rounded-lg bg-gray-100">
                    {doc.subcategory?.replace(/_/g, " ") || "General"}
                </span>
            </td>

            {/* Expiry Date */}
            <td className="py-4 font-semibold text-gray-700 text-xs">
                {doc.expiry_date
                    ? new Date(doc.expiry_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                      })
                    : "—"}
            </td>

            {/* Verification Status */}
            <td className="py-4">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize inline-flex items-center gap-1 ${statusColor(
                        doc.status
                    )}`}
                >
                    {doc.status}
                </span>
            </td>

            {/* Actions */}
            <td className="py-4 pr-3 text-right">
                <div className="flex items-center justify-end gap-1.5">
                    {/* View Details Link */}
                    <Link
                        href={`/document-details/${doc.id}`}
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-[#5a4fcf] rounded-lg text-xs font-semibold transition-all cursor-pointer"
                        title="View details & decrypt payload"
                    >
                        View
                    </Link>

                    {/* Download File Action */}
                    <button
                        type="button"
                        disabled={isDownloading}
                        onClick={() => onDownload(doc.id, doc.title)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                        title="Download & decrypt file"
                    >
                        <DownloadIcon
                            className={`w-3.5 h-3.5 ${isDownloading ? "animate-bounce text-[#5a4fcf]" : ""}`}
                        />
                    </button>

                    {/* Delete Action with Quick Confirmation */}
                    {confirmDelete ? (
                        <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-200 animate-fade-in">
                            <span className="text-[10px] text-rose-700 font-semibold px-1">Delete?</span>
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => onDelete(doc.id, doc.title)}
                                className="px-1.5 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold cursor-pointer"
                            >
                                {isDeleting ? "..." : "Yes"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmDelete(false)}
                                className="px-1.5 py-0.5 bg-white text-gray-600 rounded text-[10px] font-medium border border-gray-200 cursor-pointer"
                            >
                                No
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setConfirmDelete(true)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete document"
                        >
                            <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}

// ─── Filter / Sort Selects ──────────────────────────────────────────────────

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
                className="text-xs font-normal border border-gray-200 rounded px-1.5 py-1 bg-white text-gray-700 outline-none cursor-pointer max-w-[140px] truncate"
                value={value}
                onChange={(e) => onChange(column, e.target.value)}
            >
                {options.map((val) => (
                    <option key={val} value={val}>
                        {val === "All" ? "All" : val.replace(/_/g, " ")}
                    </option>
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

export function SortSelect({
    column,
    label,
    currentColumn,
    currentDirection,
    onChange,
}: SortSelectProps) {
    return (
        <div className="flex flex-col items-start gap-1">
            <span>{label}</span>
            <select
                className="text-xs font-normal border border-gray-200 rounded px-1.5 py-1 bg-white text-gray-700 outline-none cursor-pointer"
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
