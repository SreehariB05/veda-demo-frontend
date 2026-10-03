"use client";

import React from "react";
import Link from "next/link";
import { FolderIcon, PlusIcon } from "@/lib/icons";
import type { DocumentCategory } from "@/lib/types/api.types";
import { getCategoryTheme } from "../_hooks/use-document-categories";

interface CategoryCardProps {
    category: DocumentCategory;
    docCount: number;
    onSelect: (id: string) => void;
}

export function CategoryCard({ category, docCount, onSelect }: CategoryCardProps) {
    const theme = getCategoryTheme(category.id);
    const subcategories = category.subcategories || [];

    return (
        <div
            onClick={() => onSelect(category.id)}
            className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-gray-200"
        >
            <div>
                {/* Header: Icon & Document Count */}
                <div className="flex items-center justify-between mb-4">
                    <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${theme.bgLight} transition-transform group-hover:scale-105`}
                    >
                        <FolderIcon className={`w-5 h-5 ${theme.textDark}`} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                        {docCount} {docCount === 1 ? "Document" : "Documents"}
                    </span>
                </div>

                {/* Category Title & Description */}
                <h3 className="text-lg font-bold text-[#1a172c] mb-1.5 group-hover:text-[#5a4fcf] transition-colors">
                    {category.name}
                </h3>
                <p className="text-xs text-gray-500 font-normal leading-relaxed mb-4 line-clamp-2">
                    {category.description || "Official documents and certificates in this category."}
                </p>

                {/* Subcategories preview */}
                {subcategories.length > 0 && (
                    <div className="mb-4">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                            Supported Subcategories ({subcategories.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {subcategories.slice(0, 3).map((sub) => (
                                <span
                                    key={sub.id}
                                    className="text-[11px] font-medium px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-100"
                                >
                                    {sub.name}
                                </span>
                            ))}
                            {subcategories.length > 3 && (
                                <span className="text-[11px] font-medium px-2 py-1 bg-indigo-50 text-[#5a4fcf] rounded-lg">
                                    +{subcategories.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Accent Line */}
            <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#5a4fcf] pt-3 border-t border-gray-50">
                    <span>Explore Documents</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </div>
        </div>
    );
}

interface CategoryGridProps {
    categories: DocumentCategory[];
    getDocumentCount: (catId: string) => number;
    searchQuery: string;
    onSelect: (id: string) => void;
}

export function CategoryGrid({
    categories,
    getDocumentCount,
    searchQuery,
    onSelect,
}: CategoryGridProps) {
    if (categories.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <h3 className="text-base font-bold text-gray-800 mb-1">No categories found</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                    No categories matching &quot;{searchQuery}&quot;. Try a different search term.
                </p>
                <Link
                    href="/document-upload"
                    className="px-4 py-2 bg-[#5a4fcf] text-white text-xs font-semibold rounded-xl hover:bg-[#4a3fb8] transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                    <PlusIcon className="w-3.5 h-3.5" />
                    <span>Upload New Document</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    docCount={getDocumentCount(category.id)}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
