"use client";

import { useState, useMemo, useEffect } from "react";

export interface DocumentItem {
    id: string;
    name: string;
    type: string;
    size: string;
    updatedAt: string;
    status: "Verified" | "Active" | "Pending" | "Expired";
    statusColor: string;
    categoryId: string;
}

export interface Category {
    id: string;
    name: string;
    updatedAt: string;
    color: string;
    bgLight: string;
    textDark: string;
}

export const COLOR_THEMES = [
    { name: "Green", color: "#22c55e", bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100", textDark: "text-emerald-700" },
    { name: "Blue", color: "#3b82f6", bgLight: "bg-blue-50 text-blue-600 border-blue-100", textDark: "text-blue-700" },
    { name: "Purple", color: "#8b5cf6", bgLight: "bg-purple-50 text-purple-600 border-purple-100", textDark: "text-purple-700" },
    { name: "Orange", color: "#f97316", bgLight: "bg-orange-50 text-orange-600 border-orange-100", textDark: "text-orange-700" },
    { name: "Red", color: "#ef4444", bgLight: "bg-rose-50 text-rose-600 border-rose-100", textDark: "text-rose-700" },
    { name: "Indigo", color: "#6366f1", bgLight: "bg-indigo-50 text-indigo-600 border-indigo-100", textDark: "text-indigo-700" },
    { name: "Teal", color: "#14b8a6", bgLight: "bg-teal-50 text-teal-600 border-teal-100", textDark: "text-teal-700" },
    { name: "Slate", color: "#64748b", bgLight: "bg-slate-100 text-slate-600 border-slate-200", textDark: "text-slate-700" },
];

const INITIAL_CATEGORIES: Category[] = [
    { id: "cat-1", name: "Health & Medical", updatedAt: "2 hrs ago", color: "#22c55e", bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100", textDark: "text-emerald-700" },
    { id: "cat-2", name: "Real Estate", updatedAt: "Yesterday", color: "#3b82f6", bgLight: "bg-blue-50 text-blue-600 border-blue-100", textDark: "text-blue-700" },
    { id: "cat-3", name: "Legal & NDA", updatedAt: "3 days ago", color: "#8b5cf6", bgLight: "bg-purple-50 text-purple-600 border-purple-100", textDark: "text-purple-700" },
    { id: "cat-4", name: "Personal ID", updatedAt: "Jan 12, 2026", color: "#f97316", bgLight: "bg-orange-50 text-orange-600 border-orange-100", textDark: "text-orange-700" },
    { id: "cat-5", name: "Finance & Tax", updatedAt: "Dec 20, 2025", color: "#ef4444", bgLight: "bg-rose-50 text-rose-600 border-rose-100", textDark: "text-rose-700" },
    { id: "cat-6", name: "Education & Certificates", updatedAt: "Never", color: "#64748b", bgLight: "bg-slate-100 text-slate-600 border-slate-200", textDark: "text-slate-700" },
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
    { id: "doc-1", name: "Vaccination_Record_2026.pdf", type: "PDF", size: "1.4 MB", updatedAt: "2 hrs ago", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-1" },
    { id: "doc-2", name: "Health_Insurance_Policy.pdf", type: "PDF", size: "3.2 MB", updatedAt: "Yesterday", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-1" },
    { id: "doc-3", name: "Annual_Checkup_Results.pdf", type: "PDF", size: "850 KB", updatedAt: "Jan 14, 2026", status: "Active", statusColor: "bg-[#e0f2fe] text-[#3b82f6]", categoryId: "cat-1" },
    { id: "doc-4", name: "Apartment_Lease_Agreement.pdf", type: "PDF", size: "4.5 MB", updatedAt: "Yesterday", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-2" },
    { id: "doc-5", name: "Property_Tax_Receipt.pdf", type: "PDF", size: "1.2 MB", updatedAt: "Feb 02, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-2" },
    { id: "doc-6", name: "Home_Floor_Plan.img", type: "IMG", size: "5.8 MB", updatedAt: "Jan 28, 2026", status: "Active", statusColor: "bg-[#e0f2fe] text-[#3b82f6]", categoryId: "cat-2" },
    { id: "doc-7", name: "Deed_Registration_Doc.docx", type: "DOCX", size: "2.1 MB", updatedAt: "Jan 10, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-2" },
    { id: "doc-8", name: "Client_Non_Disclosure_2026.docx", type: "DOCX", size: "1.8 MB", updatedAt: "3 days ago", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-3" },
    { id: "doc-9", name: "Consulting_Service_Agreement.pdf", type: "PDF", size: "2.7 MB", updatedAt: "Feb 10, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-3" },
    { id: "doc-10", name: "Passport_Scan_Front_Back.img", type: "IMG", size: "2.3 MB", updatedAt: "Jan 12, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-4" },
    { id: "doc-11", name: "National_Identity_Card.img", type: "IMG", size: "1.5 MB", updatedAt: "Jan 12, 2026", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-4" },
    { id: "doc-12", name: "Annual_Tax_Return_FY25.pdf", type: "PDF", size: "3.9 MB", updatedAt: "Dec 20, 2025", status: "Verified", statusColor: "bg-[#e0f8e9] text-[#22c55e]", categoryId: "cat-5" },
];

/**
 * Hook for managing document categories page: categories, documents,
 * modals, localStorage persistence, and all CRUD operations.
 */
export function useDocumentCategories() {
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
    const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Modals
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddDocModal, setShowAddDocModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // New Category Form State
    const [categoryNameInput, setCategoryNameInput] = useState("");
    const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);

    // New/Assign Document Form State
    const [docModalTab, setDocModalTab] = useState<"assign" | "create">("assign");
    const [selectedDocIdsToAssign, setSelectedDocIdsToAssign] = useState<string[]>([]);

    // Toast notification state
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedCats = localStorage.getItem("veda_doc_categories");
            const savedDocs = localStorage.getItem("veda_documents");
            if (savedCats) setCategories(JSON.parse(savedCats));
            if (savedDocs) setDocuments(JSON.parse(savedDocs));
        } catch (e) {
            console.error("Error loading stored data", e);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage when state changes
    useEffect(() => {
        if (!isLoaded) return;
        try {
            localStorage.setItem("veda_doc_categories", JSON.stringify(categories));
            localStorage.setItem("veda_documents", JSON.stringify(documents));
        } catch (e) {
            console.error("Error saving data", e);
        }
    }, [categories, documents, isLoaded]);

    const selectedCategory = useMemo(() => categories.find((c) => c.id === selectedCategoryId) || null, [categories, selectedCategoryId]);

    const filteredCategories = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return categories;
        return categories.filter((cat) => cat.name.toLowerCase().includes(query));
    }, [categories, searchQuery]);

    const categoryDocuments = useMemo(() => {
        if (!selectedCategoryId) return [];
        return documents.filter((d) => d.categoryId === selectedCategoryId);
    }, [documents, selectedCategoryId]);

    const availableToAssignDocuments = useMemo(() => {
        if (!selectedCategoryId) return [];
        return documents.filter((d) => d.categoryId !== selectedCategoryId);
    }, [documents, selectedCategoryId]);

    const getDocumentCount = (catId: string) => documents.filter((d) => d.categoryId === catId).length;

    const handleSaveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = categoryNameInput.trim();
        if (!trimmed) return;
        const theme = COLOR_THEMES[selectedThemeIndex] || COLOR_THEMES[0];
        if (editingCategory) {
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === editingCategory.id
                        ? { ...cat, name: trimmed, color: theme.color, bgLight: theme.bgLight, textDark: theme.textDark, updatedAt: "Just now" }
                        : cat
                )
            );
            showToast(`Updated category "${trimmed}"`);
        } else {
            const newCat: Category = {
                id: `cat-${Date.now()}`,
                name: trimmed,
                updatedAt: "Just now",
                color: theme.color,
                bgLight: theme.bgLight,
                textDark: theme.textDark,
            };
            setCategories((prev) => [newCat, ...prev]);
            showToast(`Created category "${trimmed}"`);
        }
        setCategoryNameInput("");
        setEditingCategory(null);
        setShowAddCategoryModal(false);
    };

    const handleDeleteCategory = (catId: string, catName: string) => {
        if (confirm(`Are you sure you want to delete category "${catName}"? Documents will be unassigned.`)) {
            setCategories((prev) => prev.filter((c) => c.id !== catId));
            setDocuments((prev) => prev.map((doc) => (doc.categoryId === catId ? { ...doc, categoryId: "" } : doc)));
            if (selectedCategoryId === catId) setSelectedCategoryId(null);
            showToast(`Deleted category "${catName}"`);
        }
    };

    const handleRemoveDocFromCategory = (docId: string, docName: string) => {
        setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, categoryId: "" } : doc)));
        showToast(`Removed "${docName}" from category`);
    };

    const handleAssignDocs = () => {
        if (!selectedCategoryId || selectedDocIdsToAssign.length === 0) return;
        setDocuments((prev) =>
            prev.map((doc) =>
                selectedDocIdsToAssign.includes(doc.id) ? { ...doc, categoryId: selectedCategoryId, updatedAt: "Just now" } : doc
            )
        );
        setCategories((prev) =>
            prev.map((c) => (c.id === selectedCategoryId ? { ...c, updatedAt: "Just now" } : c))
        );
        showToast(`Added ${selectedDocIdsToAssign.length} document(s) to ${selectedCategory?.name}`);
        setSelectedDocIdsToAssign([]);
        setShowAddDocModal(false);
    };

    const handleFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCategoryId) return;
        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;
        if (!file || !file.name) return;
        const sizeFormatted =
            file.size < 1024 * 1024
                ? (file.size / 1024).toFixed(0) + " KB"
                : (file.size / (1024 * 1024)).toFixed(2) + " MB";
        const newDoc: DocumentItem = {
            id: `doc-${Date.now()}`,
            name: file.name,
            type: file.name.split(".").pop()?.toUpperCase() || "FILE",
            size: sizeFormatted,
            updatedAt: "Just now",
            status: "Verified",
            statusColor: "bg-[#e0f8e9] text-[#22c55e]",
            categoryId: selectedCategoryId,
        };
        setDocuments((prev) => [newDoc, ...prev]);
        setCategories((prev) =>
            prev.map((c) => (c.id === selectedCategoryId ? { ...c, updatedAt: "Just now" } : c))
        );
        showToast(`Created & added "${newDoc.name}"`);
        setShowAddDocModal(false);
    };

    const openEditCategory = (cat: Category, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingCategory(cat);
        setCategoryNameInput(cat.name);
        const idx = COLOR_THEMES.findIndex((t) => t.color.toLowerCase() === cat.color.toLowerCase());
        setSelectedThemeIndex(idx !== -1 ? idx : 0);
        setShowAddCategoryModal(true);
    };

    const openCreateCategory = () => {
        setEditingCategory(null);
        setCategoryNameInput("");
        setSelectedThemeIndex(0);
        setShowAddCategoryModal(true);
    };

    return {
        categories,
        documents,
        searchQuery, setSearchQuery,
        selectedCategoryId, setSelectedCategoryId,
        selectedCategory,
        filteredCategories,
        categoryDocuments,
        availableToAssignDocuments,
        getDocumentCount,
        showAddCategoryModal, setShowAddCategoryModal,
        showAddDocModal, setShowAddDocModal,
        editingCategory,
        categoryNameInput, setCategoryNameInput,
        selectedThemeIndex, setSelectedThemeIndex,
        docModalTab, setDocModalTab,
        selectedDocIdsToAssign, setSelectedDocIdsToAssign,
        toastMessage,
        handleSaveCategory,
        handleDeleteCategory,
        handleRemoveDocFromCategory,
        handleAssignDocs,
        handleFileUpload,
        openEditCategory,
        openCreateCategory,
    };
}
