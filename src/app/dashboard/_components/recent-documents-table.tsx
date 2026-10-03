import React from "react";
import Link from "next/link";
import type { Document } from "@/lib/types/api.types";

function statusColor(status: string): string {
    switch (status) {
        case "verified": return "bg-[#e0f8e9] text-[#22c55e]";
        case "pending":  return "bg-[#fef9c3] text-[#ca8a04]";
        case "rejected": return "bg-[#fee2e2] text-[#ef4444]";
        default:         return "bg-gray-100 text-gray-500";
    }
}

interface TableRowProps {
    doc: Document;
}

function TableRow({ doc }: TableRowProps) {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="py-5 pl-2">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-[#5a4fcf] font-bold text-xs flex items-center justify-center shrink-0">
                        {doc.type.slice(0, 3).toUpperCase()}
                    </div>
                    <div className="text-xs font-semibold text-gray-700">{doc.title}</div>
                </div>
            </td>
            <td className="py-5">
                <div className="text-xs font-semibold text-gray-400 capitalize">{doc.category}</div>
            </td>
            <td className="py-5 font-bold text-gray-700 text-xs">
                {doc.expiry_date
                    ? new Date(doc.expiry_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "—"}
            </td>
            <td className="py-5">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize ${statusColor(doc.status)}`}>
                    {doc.status}
                </span>
            </td>
        </tr>
    );
}

interface RecentDocumentsTableProps {
    documents: Document[];
    isLoading?: boolean;
}

export function RecentDocumentsTable({ documents, isLoading }: RecentDocumentsTableProps) {
    // Show most recent 5
    const recent = documents.slice(0, 5);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 pt-5">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#1a172c]">Recent Documents</h2>
                <Link href="/document-details">
                    <button className="text-sm font-semibold text-[#5a4fcf] hover:text-[#4239a0] transition-colors">
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
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="py-10 text-center text-sm text-gray-400">
                                    Loading documents…
                                </td>
                            </tr>
                        ) : recent.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-10 text-center text-sm text-gray-400">
                                    No documents yet. <Link href="/document-upload" className="text-[#5a4fcf] font-semibold hover:underline">Upload your first document →</Link>
                                </td>
                            </tr>
                        ) : (
                            recent.map((doc) => <TableRow key={doc.id} doc={doc} />)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
