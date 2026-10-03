"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { documentService } from "@/lib/services/document.service";
import type { Document } from "@/lib/types/api.types";

type FilterState = { type: string; category: string; status: string };
type SortState = { column: string | null; direction: "asc" | "desc" | null };

/**
 * Hook for the document-details page.
 * Fetches real documents from GET /api/documents with filter/sort support.
 */
export function useDocumentDetails() {
    const [allDocuments, setAllDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<FilterState>({
        type: "All",
        category: "All",
        status: "All",
    });
    const [sort, setSort] = useState<SortState>({ column: null, direction: null });
    const [searchQuery, setSearchQuery] = useState("");

    const fetchDocuments = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const docs = await documentService.listDocuments();
            setAllDocuments(docs);
        } catch {
            setError("Failed to load documents.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const handleFilterChange = (column: string, value: string) => {
        setFilters((prev) => ({ ...prev, [column]: value }));
    };

    const handleSortChange = (column: string, value: string) => {
        if (value === "None") {
            setSort({ column: null, direction: null });
        } else {
            setSort({ column, direction: value as "asc" | "desc" });
        }
    };

    const uniqueValues = (column: keyof Document) => {
        return [
            "All",
            ...Array.from(new Set(allDocuments.map((doc) => String(doc[column])))),
        ];
    };

    const processedDocuments = useMemo(() => {
        let docs = allDocuments.filter((doc) => {
            const matchesType =
                filters.type === "All" || doc.type === filters.type;
            const matchesCategory =
                filters.category === "All" || doc.category === filters.category;
            const matchesStatus =
                filters.status === "All" || doc.status === filters.status;
            const matchesSearch =
                !searchQuery ||
                doc.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesCategory && matchesStatus && matchesSearch;
        });

        if (sort.column && sort.direction) {
            docs = [...docs].sort((a, b) => {
                const aVal = String(a[sort.column as keyof Document] ?? "");
                const bVal = String(b[sort.column as keyof Document] ?? "");
                if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
                if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        return docs;
    }, [allDocuments, filters, sort, searchQuery]);

    const deleteDocument = async (docId: string) => {
        try {
            await documentService.deleteDocument(docId);
            setAllDocuments((prev) => prev.filter((d) => d.id !== docId));
        } catch {
            setError("Failed to delete document.");
        }
    };

    return {
        filters,
        sort,
        searchQuery, setSearchQuery,
        handleFilterChange,
        handleSortChange,
        uniqueValues,
        processedDocuments,
        isLoading,
        error,
        deleteDocument,
        refresh: fetchDocuments,
    };
}
