"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { documentService } from "@/lib/services/document.service";
import type { Document, DocumentCategory } from "@/lib/types/api.types";
import apiClient from "@/lib/api-client";

type FilterState = { type: string; category: string; subcategory: string; status: string };
type SortState = { column: string | null; direction: "asc" | "desc" | null };

/**
 * Hook for the document-details page.
 * Fetches real documents from GET /api/documents with taxonomy filter and sort support.
 */
export function useDocumentDetails() {
    const [allDocuments, setAllDocuments] = useState<Document[]>([]);
    const [categories, setCategories] = useState<DocumentCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [filters, setFilters] = useState<FilterState>({
        type: "All",
        category: "All",
        subcategory: "All",
        status: "All",
    });
    const [sort, setSort] = useState<SortState>({ column: "created_at", direction: "desc" });
    const [searchQuery, setSearchQuery] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const fetchDocuments = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [docs, catRes] = await Promise.allSettled([
                documentService.listDocuments(),
                documentService.getCategories(),
            ]);

            if (docs.status === "fulfilled") {
                setAllDocuments(docs.value || []);
            } else {
                setError("Failed to load documents from server.");
            }

            if (catRes.status === "fulfilled" && catRes.value?.categories) {
                setCategories(catRes.value.categories);
            }
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
        setFilters((prev) => {
            const next = { ...prev, [column]: value };
            if (column === "category") {
                next.subcategory = "All";
            }
            return next;
        });
    };

    const handleSortChange = (column: string, value: string) => {
        if (value === "None") {
            setSort({ column: null, direction: null });
        } else {
            setSort({ column, direction: value as "asc" | "desc" });
        }
    };

    // Subcategories available based on selected category filter
    const availableSubcategories = useMemo(() => {
        if (filters.category === "All") {
            return ["All", ...Array.from(new Set(allDocuments.map((d) => d.subcategory).filter(Boolean)))];
        }
        const activeCat = categories.find((c) => c.id === filters.category);
        if (activeCat?.subcategories) {
            return ["All", ...activeCat.subcategories.map((s) => s.id)];
        }
        return ["All", ...Array.from(new Set(allDocuments.filter((d) => d.category === filters.category).map((d) => d.subcategory)))];
    }, [filters.category, categories, allDocuments]);

    const uniqueValues = (column: keyof Document) => {
        return [
            "All",
            ...Array.from(new Set(allDocuments.map((doc) => String(doc[column] || "")))).filter(Boolean),
        ];
    };

    const processedDocuments = useMemo(() => {
        let docs = allDocuments.filter((doc) => {
            const matchesType = filters.type === "All" || doc.type === filters.type;
            const matchesCategory = filters.category === "All" || doc.category === filters.category;
            const matchesSub = filters.subcategory === "All" || doc.subcategory === filters.subcategory;
            const matchesStatus = filters.status === "All" || doc.status === filters.status;
            const matchesSearch =
                !searchQuery ||
                doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.subcategory?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesCategory && matchesSub && matchesStatus && matchesSearch;
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

    // Delete Document (6.9 DELETE /api/documents/:docId)
    const deleteDocument = async (docId: string, title?: string) => {
        setDeletingId(docId);
        try {
            await documentService.deleteDocument(docId);
            setAllDocuments((prev) => prev.filter((d) => d.id !== docId));
            showToast(`Document "${title || docId}" deleted successfully.`);
        } catch (err) {
            console.error("Delete failed", err);
            setError("Failed to delete document.");
        } finally {
            setDeletingId(null);
        }
    };

    // Download & Decrypt File (6.5 GET /api/documents/:docId/file)
    const downloadDocumentFile = async (docId: string, docTitle: string) => {
        setDownloadingId(docId);
        try {
            const res = await apiClient.get(`/documents/${docId}/file`, {
                responseType: "blob",
            });
            const rawContentType = res.headers["content-type"];
            const contentType = typeof rawContentType === "string" ? rawContentType : "application/octet-stream";
            const blob = new Blob([res.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            let extension = "";
            if (contentType.includes("pdf")) extension = ".pdf";
            else if (contentType.includes("jpeg") || contentType.includes("jpg")) extension = ".jpg";
            else if (contentType.includes("png")) extension = ".png";
            else if (contentType.includes("docx")) extension = ".docx";
            const cleanTitle = docTitle.replace(/[^a-zA-Z0-9_-]/g, "_");
            a.download = `${cleanTitle}${extension}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            showToast(`Downloaded & decrypted "${docTitle}".`);
        } catch (err) {
            console.error("File download failed", err);
            setError("Could not download file. This document might be digital-only or decryption failed.");
        } finally {
            setDownloadingId(null);
        }
    };

    return {
        categories,
        filters,
        sort,
        searchQuery,
        setSearchQuery,
        handleFilterChange,
        handleSortChange,
        availableSubcategories,
        uniqueValues,
        processedDocuments,
        allDocumentsCount: allDocuments.length,
        isLoading,
        error,
        toastMessage,
        deletingId,
        downloadingId,
        deleteDocument,
        downloadDocumentFile,
        refresh: fetchDocuments,
    };
}
