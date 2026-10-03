"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { documentService } from "@/lib/services/document.service";
import type { Document, DocumentCategory, DocumentSubcategory } from "@/lib/types/api.types";

export interface CategoryVisual {
    color: string;
    bgLight: string;
    borderLight: string;
    textDark: string;
}

const CATEGORY_THEMES: Record<string, CategoryVisual> = {
    government: {
        color: "#5a4fcf",
        bgLight: "bg-indigo-50",
        borderLight: "border-indigo-100",
        textDark: "text-[#5a4fcf]",
    },
    educational_institution: {
        color: "#059669",
        bgLight: "bg-emerald-50",
        borderLight: "border-emerald-100",
        textDark: "text-emerald-700",
    },
    financial: {
        color: "#d97706",
        bgLight: "bg-amber-50",
        borderLight: "border-amber-100",
        textDark: "text-amber-700",
    },
    medical: {
        color: "#dc2626",
        bgLight: "bg-rose-50",
        borderLight: "border-rose-100",
        textDark: "text-rose-700",
    },
    legal: {
        color: "#7c3aed",
        bgLight: "bg-purple-50",
        borderLight: "border-purple-100",
        textDark: "text-purple-700",
    },
    other: {
        color: "#475569",
        bgLight: "bg-slate-100",
        borderLight: "border-slate-200",
        textDark: "text-slate-700",
    },
};

export function getCategoryTheme(catId: string): CategoryVisual {
    return (
        CATEGORY_THEMES[catId] || {
            color: "#5a4fcf",
            bgLight: "bg-indigo-50",
            borderLight: "border-indigo-100",
            textDark: "text-[#5a4fcf]",
        }
    );
}

const FALLBACK_CATEGORIES: DocumentCategory[] = [
    {
        id: "government",
        name: "Government Documents",
        description: "Official identification, certificates, and government-issued cards",
        subcategories: [
            { id: "aadhar", name: "Aadhar Card", required_fields: ["aadhar_number", "dob"] },
            { id: "pan_card", name: "PAN Card", required_fields: ["pan_number"] },
            { id: "passport", name: "Passport", required_fields: ["passport_number", "expiry_date"] },
            { id: "driving_license", name: "Driving License", required_fields: ["dl_number", "valid_till"] },
        ],
    },
    {
        id: "educational_institution",
        name: "Educational Institutions",
        description: "Academic degrees, diplomas, transcripts, and institutional certificates",
        subcategories: [
            { id: "degree_certificate", name: "Degree Certificate" },
            { id: "marksheet", name: "Marksheet / Transcript" },
        ],
    },
];

/**
 * Hook for managing the Document Categories page.
 * Integrates with:
 * - GET /api/documents/categories (6.1 Category & Subcategory Taxonomy)
 * - GET /api/documents (6.2 List My Documents)
 */
export function useDocumentCategories() {
    const [categories, setCategories] = useState<DocumentCategory[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Fetch categories and documents in parallel
            const [categoriesRes, docsRes] = await Promise.allSettled([
                documentService.getCategories(),
                documentService.listDocuments(),
            ]);

            if (categoriesRes.status === "fulfilled" && categoriesRes.value?.categories?.length > 0) {
                setCategories(categoriesRes.value.categories);
            } else {
                // Fallback to official taxonomy if categories endpoint returned empty or unauthenticated
                setCategories(FALLBACK_CATEGORIES);
            }

            if (docsRes.status === "fulfilled") {
                setDocuments(docsRes.value || []);
            } else {
                setDocuments([]);
            }
        } catch (err: unknown) {
            console.error("Failed to load category taxonomy or documents", err);
            setError("Unable to load latest taxonomy from server. Displaying cached categories.");
            setCategories(FALLBACK_CATEGORIES);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const selectedCategory = useMemo(
        () => categories.find((c) => c.id === selectedCategoryId) || null,
        [categories, selectedCategoryId]
    );

    const filteredCategories = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return categories;
        return categories.filter((cat) => {
            const matchName = cat.name.toLowerCase().includes(query);
            const matchDesc = cat.description?.toLowerCase().includes(query);
            const matchSub = cat.subcategories?.some(
                (s) => s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query)
            );
            return matchName || matchDesc || matchSub;
        });
    }, [categories, searchQuery]);

    const categoryDocuments = useMemo(() => {
        if (!selectedCategoryId) return [];
        return documents.filter((d) => {
            const matchesCategory = d.category?.toLowerCase() === selectedCategoryId.toLowerCase();
            const matchesSub = !selectedSubcategoryFilter || d.subcategory === selectedSubcategoryFilter;
            return matchesCategory && matchesSub;
        });
    }, [documents, selectedCategoryId, selectedSubcategoryFilter]);

    const getDocumentCount = useCallback(
        (catId: string) => {
            return documents.filter((d) => d.category?.toLowerCase() === catId.toLowerCase()).length;
        },
        [documents]
    );

    const handleSelectCategory = (id: string | null) => {
        setSelectedCategoryId(id);
        setSelectedSubcategoryFilter(null);
    };

    return {
        categories,
        documents,
        isLoading,
        error,
        searchQuery,
        setSearchQuery,
        selectedCategoryId,
        setSelectedCategoryId: handleSelectCategory,
        selectedCategory,
        filteredCategories,
        categoryDocuments,
        selectedSubcategoryFilter,
        setSelectedSubcategoryFilter,
        getDocumentCount,
        refresh: fetchData,
    };
}
