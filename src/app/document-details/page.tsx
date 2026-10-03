"use client";

import DashSidebar from "../components/dash-sidebar";
import DashHeader from "../components/dash-header";
import { SearchIcon } from "@/lib/icons";
import { DocumentTableRow, FilterSelect, SortSelect } from "./_components/document-table";
import { useDocumentDetails } from "./_hooks/use-document-details";
import type { Document } from "@/lib/types/api.types";
import React from "react";

export default function DocumentDetails() {
    const {
        filters,
        sort,
        searchQuery, setSearchQuery,
        handleFilterChange,
        handleSortChange,
        uniqueValues,
        processedDocuments,
        isLoading,
        error,
    } = useDocumentDetails();

    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans">
            <DashHeader />

            <div className="flex flex-1 overflow-hidden">
                <DashSidebar page="document-details" />

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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search documents..."
                                className="w-full bg-[#f3f4f6] border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    {/* Documents Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 pt-5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs font-bold text-gray-500 border-b border-gray-100">
                                        <th className="pb-4 pl-2 align-top">
                                            <FilterSelect column="type" label="Type" options={uniqueValues("type")} value={filters.type} onChange={handleFilterChange} />
                                        </th>
                                        <th className="pb-4 align-top">
                                            <SortSelect column="title" label="Title" currentColumn={sort.column} currentDirection={sort.direction} onChange={handleSortChange} />
                                        </th>
                                        <th className="pb-4 align-top">
                                            <FilterSelect column="category" label="Category" options={uniqueValues("category")} value={filters.category} onChange={handleFilterChange} />
                                        </th>
                                        <th className="pb-4 align-top">Subcategory</th>
                                        <th className="pb-4 align-top">
                                            <SortSelect column="expiry_date" label="Expiry" currentColumn={sort.column} currentDirection={sort.direction} onChange={handleSortChange} />
                                        </th>
                                        <th className="pb-4 align-top">
                                            <FilterSelect column="status" label="Status" options={uniqueValues("status")} value={filters.status} onChange={handleFilterChange} />
                                        </th>
                                        <th className="pb-4 align-top pt-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-50">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={7} className="py-10 text-center text-gray-400">
                                                Loading documents…
                                            </td>
                                        </tr>
                                    ) : processedDocuments.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="py-10 text-center text-gray-400">
                                                No documents found matching the current filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        processedDocuments.map((doc: Document) => (
                                            <DocumentTableRow key={doc.id} doc={doc} />
                                        ))
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
