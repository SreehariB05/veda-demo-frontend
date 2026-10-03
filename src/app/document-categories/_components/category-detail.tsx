"use client";

import React from "react";
import Link from "next/link";
import { FolderIcon, FolderEmptyIcon, PlusIcon, ArrowLeftIcon } from "@/lib/icons";
import type { Document, DocumentCategory } from "@/lib/types/api.types";
import { getCategoryTheme } from "../_hooks/use-document-categories";

interface CategoryDetailProps {
    selectedCategory: DocumentCategory;
    categoryDocuments: Document[];
    selectedSubcategoryFilter: string | null;
    onSelectSubcategoryFilter: (subId: string | null) => void;
    onBack: () => void;
}

function statusColor(status: string): string {
    switch (status) {
        case "verified":
            return "bg-[#e0f8e9] text-[#22c55e]";
        case "pending":
            return "bg-[#fef9c3] text-[#ca8a04]";
        case "rejected":
            return "bg-[#fee2e2] text-[#ef4444]";
        default:
            return "bg-gray-100 text-gray-500";
    }
}

export function CategoryDetail({
    selectedCategory,
    categoryDocuments,
    selectedSubcategoryFilter,
    onSelectSubcategoryFilter,
    onBack,
}: CategoryDetailProps) {
    const theme = getCategoryTheme(selectedCategory.id);
    const subcategories = selectedCategory.subcategories || [];

    return (
        <div>
            {/* Breadcrumb & Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#5a4fcf] mb-3 transition-colors cursor-pointer"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>Back to All Categories</span>
                    </button>
                    <div className="flex items-center gap-3.5">
                        <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.bgLight} border ${theme.borderLight}`}
                        >
                            <FolderIcon className={`w-6 h-6 ${theme.textDark}`} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-[#1a172c]">{selectedCategory.name}</h1>
                                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-gray-100 text-gray-500">
                                    {selectedCategory.id}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                                {selectedCategory.description || "Official documents categorized under this taxonomy."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/document-upload?category=${selectedCategory.id}`}
                        className="px-5 py-2.5 bg-[#5a4fcf] hover:bg-[#4a3fb8] text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-100 cursor-pointer"
                    >
                        <PlusIcon className="w-4 h-4" />
                        <span>Upload to Category</span>
                    </Link>
                </div>
            </div>

            {/* Subcategories & Required Fields Taxonomy Panel */}
            {subcategories.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-[#1a172c] uppercase tracking-wider">
                            Subcategories & Required Data Fields
                        </h2>
                        <span className="text-xs text-gray-400">Click to filter documents below</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        <button
                            onClick={() => onSelectSubcategoryFilter(null)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                selectedSubcategoryFilter === null
                                    ? "bg-[#5a4fcf] text-white shadow-xs"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            All Subcategories ({subcategories.length})
                        </button>
                        {subcategories.map((sub) => {
                            const isSelected = selectedSubcategoryFilter === sub.id;
                            const hasRequired = sub.required_fields && sub.required_fields.length > 0;
                            return (
                                <button
                                    key={sub.id}
                                    onClick={() => onSelectSubcategoryFilter(isSelected ? null : sub.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                                        isSelected
                                            ? "bg-indigo-50 border-[#5a4fcf] text-[#5a4fcf] shadow-xs"
                                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <span>{sub.name}</span>
                                    {hasRequired && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono">
                                            {sub.required_fields?.length} fields
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Show required fields for currently selected subcategory */}
                    {selectedSubcategoryFilter && (
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-600">
                            <span className="font-semibold text-gray-700">Required payload fields:</span>
                            {subcategories
                                .find((s) => s.id === selectedSubcategoryFilter)
                                ?.required_fields?.map((f) => (
                                    <code
                                        key={f}
                                        className="bg-indigo-50 text-[#5a4fcf] px-2 py-0.5 rounded text-[11px] font-mono"
                                    >
                                        {f}
                                    </code>
                                )) || <span className="text-gray-400">None specified</span>}
                        </div>
                    )}
                </div>
            )}

            {/* Documents Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-[#1a172c]">
                            {selectedSubcategoryFilter
                                ? `Documents: ${
                                      subcategories.find((s) => s.id === selectedSubcategoryFilter)?.name ||
                                      selectedSubcategoryFilter
                                  }`
                                : `All ${selectedCategory.name} Documents`}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {categoryDocuments.length} document{categoryDocuments.length === 1 ? "" : "s"} found
                        </p>
                    </div>

                    <Link
                        href={`/document-upload?category=${selectedCategory.id}${
                            selectedSubcategoryFilter ? `&subcategory=${selectedSubcategoryFilter}` : ""
                        }`}
                        className="px-4 py-2 bg-indigo-50 text-[#5a4fcf] hover:bg-indigo-100 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                        <PlusIcon className="w-3.5 h-3.5" />
                        <span>Add to {selectedCategory.name}</span>
                    </Link>
                </div>

                {categoryDocuments.length === 0 ? (
                    <div className="text-center py-14 px-4">
                        <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FolderEmptyIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-base font-bold text-gray-700 mb-1">
                            No documents in this {selectedSubcategoryFilter ? "subcategory" : "category"} yet
                        </h3>
                        <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                            Start adding files to organize your secure vault for {selectedCategory.name}.
                        </p>
                        <Link
                            href={`/document-upload?category=${selectedCategory.id}${
                                selectedSubcategoryFilter ? `&subcategory=${selectedSubcategoryFilter}` : ""
                            }`}
                            className="px-4 py-2 bg-[#5a4fcf] text-white text-xs font-semibold rounded-xl hover:bg-[#4a3fb8] transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                            <PlusIcon className="w-3.5 h-3.5" />
                            <span>Upload Document Now</span>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-bold text-gray-400 border-b border-gray-100">
                                    <th className="pb-3 pl-2">Type</th>
                                    <th className="pb-3">Title</th>
                                    <th className="pb-3">Subcategory</th>
                                    <th className="pb-3">Expiry Date</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right pr-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-50">
                                {categoryDocuments.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50/60 transition-colors group">
                                        <td className="py-4 pl-2">
                                            <div className="w-9 h-8 rounded-lg bg-indigo-50 text-[#5a4fcf] font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                                                {doc.type ? doc.type.slice(0, 3) : "DOC"}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className="font-semibold text-gray-800 text-xs">{doc.title}</span>
                                        </td>
                                        <td className="py-4 text-xs font-medium text-gray-500 capitalize">
                                            {doc.subcategory || "general"}
                                        </td>
                                        <td className="py-4 text-xs font-medium text-gray-500">
                                            {doc.expiry_date
                                                ? new Date(doc.expiry_date).toLocaleDateString("en-US", {
                                                      month: "short",
                                                      day: "numeric",
                                                      year: "numeric",
                                                  })
                                                : "—"}
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColor(
                                                    doc.status
                                                )}`}
                                            >
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right pr-2">
                                            <Link
                                                href={`/document-details`}
                                                className="px-3 py-1.5 text-xs font-semibold text-[#5a4fcf] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                                            >
                                                <span>View</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
