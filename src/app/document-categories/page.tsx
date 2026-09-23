"use client";

import DashSidebar from "../components/dash-sidebar";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";

interface DocumentItem {
    id: string;
    name: string;
    type: string;
    size: string;
    updatedAt: string;
    status: "Verified" | "Active" | "Pending" | "Expired";
    statusColor: string;
    categoryId: string; // matches Category.id
}

interface Category {
    id: string;
    name: string;
    updatedAt: string;
    color: string; // Tailwind color class or hex for accent
    bgLight: string;
    textDark: string;
}

const COLOR_THEMES = [
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

export default function DocumentCategoriesPage() {
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
    const [newDocName, setNewDocName] = useState("");
    const [newDocType, setNewDocType] = useState<DocumentItem["type"]>("PDF");
    const [newDocSize, setNewDocSize] = useState("1.5 MB");

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

    // Active Category when in detail view
    const selectedCategory = useMemo(() => {
        return categories.find(c => c.id === selectedCategoryId) || null;
    }, [categories, selectedCategoryId]);

    // Filter categories by search
    const filteredCategories = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return categories;
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(query)
        );
    }, [categories, searchQuery]);

    // Documents in current category
    const categoryDocuments = useMemo(() => {
        if (!selectedCategoryId) return [];
        return documents.filter(d => d.categoryId === selectedCategoryId);
    }, [documents, selectedCategoryId]);

    // Documents available to assign to current category (docs in other categories or unassigned)
    const availableToAssignDocuments = useMemo(() => {
        if (!selectedCategoryId) return [];
        return documents.filter(d => d.categoryId !== selectedCategoryId);
    }, [documents, selectedCategoryId]);

    // Count helper
    const getDocumentCount = (catId: string) => {
        return documents.filter(d => d.categoryId === catId).length;
    };

    // Handler: Create or Update Category
    const handleSaveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = categoryNameInput.trim();
        if (!trimmed) return;

        const theme = COLOR_THEMES[selectedThemeIndex] || COLOR_THEMES[0];

        if (editingCategory) {
            setCategories(prev => prev.map(cat => {
                if (cat.id === editingCategory.id) {
                    return {
                        ...cat,
                        name: trimmed,
                        color: theme.color,
                        bgLight: theme.bgLight,
                        textDark: theme.textDark,
                        updatedAt: "Just now"
                    };
                }
                return cat;
            }));
            showToast(`Updated category "${trimmed}"`);
        } else {
            const newCat: Category = {
                id: `cat-${Date.now()}`,
                name: trimmed,
                updatedAt: "Just now",
                color: theme.color,
                bgLight: theme.bgLight,
                textDark: theme.textDark
            };
            setCategories(prev => [newCat, ...prev]);
            showToast(`Created category "${trimmed}"`);
        }

        setCategoryNameInput("");
        setEditingCategory(null);
        setShowAddCategoryModal(false);
    };

    // Handler: Delete Category
    const handleDeleteCategory = (catId: string, catName: string) => {
        if (confirm(`Are you sure you want to delete category "${catName}"? Documents will be unassigned.`)) {
            setCategories(prev => prev.filter(c => c.id !== catId));
            // Move documents to unassigned
            setDocuments(prev => prev.map(doc => doc.categoryId === catId ? { ...doc, categoryId: "" } : doc));
            if (selectedCategoryId === catId) {
                setSelectedCategoryId(null);
            }
            showToast(`Deleted category "${catName}"`);
        }
    };

    // Handler: Remove document from category
    const handleRemoveDocFromCategory = (docId: string, docName: string) => {
        setDocuments(prev => prev.map(doc => {
            if (doc.id === docId) {
                return { ...doc, categoryId: "" };
            }
            return doc;
        }));
        showToast(`Removed "${docName}" from category`);
    };

    // Handler: Assign selected docs to current category
    const handleAssignDocs = () => {
        if (!selectedCategoryId || selectedDocIdsToAssign.length === 0) return;
        setDocuments(prev => prev.map(doc => {
            if (selectedDocIdsToAssign.includes(doc.id)) {
                return { ...doc, categoryId: selectedCategoryId, updatedAt: "Just now" };
            }
            return doc;
        }));
        // Update category timestamp
        setCategories(prev => prev.map(c => c.id === selectedCategoryId ? { ...c, updatedAt: "Just now" } : c));
        showToast(`Added ${selectedDocIdsToAssign.length} document(s) to ${selectedCategory?.name}`);
        setSelectedDocIdsToAssign([]);
        setShowAddDocModal(false);
    };

    // Handler: Create new doc directly into current category
    const handleFileUpload = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCategoryId) return;

        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;
        if (!file || !file.name) return;

        let sizeFormatted = "";
        if (file.size < 1024 * 1024) {
            sizeFormatted = (file.size / 1024).toFixed(0) + " KB";
        } else {
            sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + " MB";
        }

        const newDoc: DocumentItem = {
            id: `doc-${Date.now()}`,
            name: file.name,
            type: file.name.split('.').pop()?.toUpperCase() || "FILE",
            size: sizeFormatted,
            updatedAt: "Just now",
            status: "Verified",
            statusColor: "bg-[#e0f8e9] text-[#22c55e]",
            categoryId: selectedCategoryId
        };
        setDocuments(prev => [newDoc, ...prev]);
        setCategories(prev => prev.map(c => c.id === selectedCategoryId ? { ...c, updatedAt: "Just now" } : c));
        showToast(`Created & added "${newDoc.name}"`);
        setShowAddDocModal(false);
    };

    const openEditCategory = (cat: Category, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingCategory(cat);
        setCategoryNameInput(cat.name);
        const idx = COLOR_THEMES.findIndex(t => t.color.toLowerCase() === cat.color.toLowerCase());
        setSelectedThemeIndex(idx !== -1 ? idx : 0);
        setShowAddCategoryModal(true);
    };

    const openCreateCategory = () => {
        setEditingCategory(null);
        setCategoryNameInput("");
        setSelectedThemeIndex(0);
        setShowAddCategoryModal(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans text-gray-800">
            {/* Top Header */}
            <header className="h-[73px] bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <ShieldIcon className="w-6 h-6 text-[#1a172c]" />
                    <span className="font-extrabold text-xl text-[#1a172c] tracking-wide">VEDA</span>
                </div>
                <div>
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                        <UserIcon className="w-5 h-5" />
                    </div>
                </div>
            </header>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#1a172c] text-white text-sm px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                <DashSidebar page="document-categories" />

                {/* Main Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {/* View 1: Category Detail / Manage Documents */}
                    {selectedCategory ? (
                        <div>
                            {/* Breadcrumb & Top Bar */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <div>
                                    <button
                                        onClick={() => setSelectedCategoryId(null)}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#5a4fcf] mb-2 transition-colors cursor-pointer"
                                    >
                                        <ArrowLeftIcon className="w-4 h-4" />
                                        <span>Back to Categories</span>
                                    </button>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCategory.bgLight}`}>
                                            <FolderIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-[#1a172c]">{selectedCategory.name}</h1>
                                            <p className="text-xs text-gray-400 font-medium">
                                                {categoryDocuments.length} {categoryDocuments.length === 1 ? "document" : "documents"} in this category • Updated {selectedCategory.updatedAt}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={(e) => openEditCategory(selectedCategory, e)}
                                        className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                                    >
                                        <EditIcon className="w-4 h-4 text-gray-500" />
                                        <span>Edit Category</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedDocIdsToAssign([]);
                                            setDocModalTab("assign");
                                            setShowAddDocModal(true);
                                        }}
                                        className="px-5 py-2.5 bg-[#5a4fcf] hover:bg-[#4a3fb8] text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-100 cursor-pointer"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        <span>Add Documents</span>
                                    </button>
                                </div>
                            </div>

                            {/* Documents Table */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-[#1a172c]">Assigned Documents</h2>
                                    <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                                        {categoryDocuments.length} Files
                                    </span>
                                </div>

                                {categoryDocuments.length === 0 ? (
                                    <div className="text-center py-14 px-4">
                                        <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FolderEmptyIcon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-700 mb-1">No documents in this category yet</h3>
                                        <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                                            Start adding files to organize your secure vault for {selectedCategory.name}.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSelectedDocIdsToAssign([]);
                                                setDocModalTab("assign");
                                                setShowAddDocModal(true);
                                            }}
                                            className="px-4 py-2 bg-[#5a4fcf] text-white text-xs font-semibold rounded-xl hover:bg-[#4a3fb8] transition-all inline-flex items-center gap-2 cursor-pointer"
                                        >
                                            <PlusIcon className="w-3.5 h-3.5" />
                                            <span>Add Documents</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="text-xs font-bold text-gray-400 border-b border-gray-100">
                                                    <th className="pb-3 pl-2">Document Name</th>
                                                    <th className="pb-3">File Type</th>
                                                    <th className="pb-3">Size</th>
                                                    <th className="pb-3">Last Updated</th>
                                                    <th className="pb-3">Status</th>
                                                    <th className="pb-3 text-right pr-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-50">
                                                {categoryDocuments.map(doc => (
                                                    <tr key={doc.id} className="hover:bg-gray-50/60 transition-colors group">
                                                        <td className="py-4 pl-2">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#5a4fcf] font-bold text-xs flex items-center justify-center shrink-0">
                                                                    {doc.type}
                                                                </div>
                                                                <span className="font-semibold text-gray-800 text-xs">
                                                                    {doc.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-xs font-medium text-gray-500">{doc.type}</td>
                                                        <td className="py-4 text-xs font-medium text-gray-500">{doc.size}</td>
                                                        <td className="py-4 text-xs font-medium text-gray-500">{doc.updatedAt}</td>
                                                        <td className="py-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${doc.statusColor}`}>
                                                                {doc.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 text-right pr-2">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => handleRemoveDocFromCategory(doc.id, doc.name)}
                                                                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                                                                    title="Remove from this category"
                                                                >
                                                                    <TrashIcon className="w-3.5 h-3.5" />
                                                                    <span>Remove</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* View 2: All Categories Grid */
                        <div>
                            {/* Top Section */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-[#1a172c] mb-1">Categories</h1>
                                    <p className="text-sm text-gray-500 font-medium">Organize your secure digital vault</p>
                                </div>
                                <div className="flex items-center gap-4 flex-1 md:flex-initial justify-end">
                                    <div className="relative w-full md:w-80">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search categories..."
                                            className="w-full bg-[#f3f4f6] border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery("")}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={openCreateCategory}
                                        className="shrink-0 px-5 py-2.5 bg-[#5a4fcf] hover:bg-[#4a3fb8] text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-100 cursor-pointer"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        <span>Add Category</span>
                                    </button>
                                </div>
                            </div>

                            {/* Categories Grid */}
                            {filteredCategories.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                                    <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <SearchIcon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-800 mb-1">No categories found</h3>
                                    <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                                        No categories matching "{searchQuery}". Try a different keyword or create a new category.
                                    </p>
                                    <button
                                        onClick={openCreateCategory}
                                        className="px-4 py-2 bg-[#5a4fcf] text-white text-xs font-semibold rounded-xl hover:bg-[#4a3fb8] transition-all inline-flex items-center gap-2 cursor-pointer"
                                    >
                                        <PlusIcon className="w-3.5 h-3.5" />
                                        <span>Add Category</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredCategories.map(category => {
                                        const docCount = getDocumentCount(category.id);
                                        return (
                                            <div
                                                key={category.id}
                                                onClick={() => setSelectedCategoryId(category.id)}
                                                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-gray-200 overflow-hidden"
                                            >
                                                {/* Header in Card */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.bgLight} transition-transform group-hover:scale-105`}>
                                                            <FolderIcon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                                                                {docCount} {docCount === 1 ? "File" : "Files"}
                                                            </span>
                                                            <button
                                                                onClick={(e) => openEditCategory(category, e)}
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
                                                                title="Edit Category"
                                                            >
                                                                <EditIcon className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteCategory(category.id, category.name);
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-rose-50 rounded-lg text-gray-400 hover:text-rose-600 cursor-pointer"
                                                                title="Delete Category"
                                                            >
                                                                <TrashIcon className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-lg font-bold text-[#1a172c] mb-1 group-hover:text-[#5a4fcf] transition-colors">
                                                        {category.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 font-medium mb-6">
                                                        Updated {category.updatedAt}
                                                    </p>
                                                </div>

                                                {/* Bottom colored accent bar */}
                                                <div className="w-full">
                                                    <div
                                                        className="h-1.5 w-full rounded-full transition-all duration-300 group-hover:h-2"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>

            {/* Modal: Create or Edit Category */}
            {showAddCategoryModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 transform transition-all">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-[#1a172c]">
                                {editingCategory ? "Edit Category" : "Create New Category"}
                            </h2>
                            <button
                                onClick={() => setShowAddCategoryModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <CloseIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveCategory}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={categoryNameInput}
                                        onChange={(e) => setCategoryNameInput(e.target.value)}
                                        placeholder="e.g., Health & Medical, Invoices, Passports..."
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Theme Color
                                    </label>
                                    <div className="grid grid-cols-4 gap-2.5">
                                        {COLOR_THEMES.map((t, idx) => (
                                            <button
                                                type="button"
                                                key={t.name}
                                                onClick={() => setSelectedThemeIndex(idx)}
                                                className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${selectedThemeIndex === idx
                                                    ? "border-[#5a4fcf] bg-indigo-50/50 shadow-xs"
                                                    : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <span
                                                    className="w-3.5 h-3.5 rounded-full shrink-0"
                                                    style={{ backgroundColor: t.color }}
                                                />
                                                <span className="truncate">{t.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setShowAddCategoryModal(false)}
                                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#5a4fcf] hover:bg-[#4a3fb8] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer"
                                >
                                    {editingCategory ? "Save Changes" : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Add / Assign Documents to Category */}
            {showAddDocModal && selectedCategory && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 transform transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-[#1a172c]">
                                    Add Documents to {selectedCategory.name}
                                </h2>
                                <p className="text-xs text-gray-400">Choose how you want to add documents</p>
                            </div>
                            <button
                                onClick={() => setShowAddDocModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <CloseIcon className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 mb-5">
                            <button
                                type="button"
                                onClick={() => setDocModalTab("assign")}
                                className={`pb-2.5 px-4 text-xs font-semibold border-b-2 cursor-pointer transition-all ${docModalTab === "assign"
                                    ? "border-[#5a4fcf] text-[#5a4fcf]"
                                    : "border-transparent text-gray-400 hover:text-gray-700"
                                    }`}
                            >
                                Select Existing Files ({availableToAssignDocuments.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setDocModalTab("create")}
                                className={`pb-2.5 px-4 text-xs font-semibold border-b-2 cursor-pointer transition-all ${docModalTab === "create"
                                    ? "border-[#5a4fcf] text-[#5a4fcf]"
                                    : "border-transparent text-gray-400 hover:text-gray-700"
                                    }`}
                            >
                                Create / Upload New
                            </button>
                        </div>

                        {docModalTab === "assign" ? (
                            <div>
                                {availableToAssignDocuments.length === 0 ? (
                                    <div className="py-8 text-center text-gray-400 text-xs">
                                        All your existing documents are already in this category.
                                        You can switch tabs to upload a new one!
                                    </div>
                                ) : (
                                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1 mb-5">
                                        {availableToAssignDocuments.map(doc => {
                                            const isSelected = selectedDocIdsToAssign.includes(doc.id);
                                            const currentCat = categories.find(c => c.id === doc.categoryId);
                                            return (
                                                <div
                                                    key={doc.id}
                                                    onClick={() => {
                                                        setSelectedDocIdsToAssign(prev =>
                                                            isSelected ? prev.filter(id => id !== doc.id) : [...prev, doc.id]
                                                        );
                                                    }}
                                                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isSelected
                                                        ? "border-[#5a4fcf] bg-indigo-50/40"
                                                        : "border-gray-100 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? "bg-[#5a4fcf] border-[#5a4fcf] text-white" : "border-gray-300"
                                                            }`}>
                                                            {isSelected && <CheckIcon className="w-3 h-3" />}
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-semibold text-gray-800">{doc.name}</div>
                                                            <div className="text-[11px] text-gray-400">
                                                                {doc.type} • {doc.size} {currentCat ? `(Currently in ${currentCat.name})` : "(Uncategorized)"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xs text-gray-400 font-medium">
                                        {selectedDocIdsToAssign.length} selected
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddDocModal(false)}
                                            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            disabled={selectedDocIdsToAssign.length === 0}
                                            onClick={handleAssignDocs}
                                            className="px-5 py-2.5 bg-[#5a4fcf] hover:bg-[#4a3fb8] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer"
                                        >
                                            Add Selected Documents
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleFileUpload}>
                                <div className="space-y-4 mb-5">
                                    {/*
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                            Document Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newDocName}
                                            onChange={(e) => setNewDocName(e.target.value)}
                                            placeholder="e.g., Insurance_Policy_2026.pdf"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                                File Type
                                            </label>
                                            <select
                                                value={newDocType}
                                                onChange={(e) => setNewDocType(e.target.value as DocumentItem["type"])}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
                                            >
                                                <option value="PDF">PDF</option>
                                                <option value="DOCX">DOCX</option>
                                                <option value="IMG">IMG</option>
                                                <option value="XLSX">XLSX</option>
                                                <option value="TXT">TXT</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                                File Size
                                            </label>
                                            <input
                                                type="text"
                                                value={newDocSize}
                                                onChange={(e) => setNewDocSize(e.target.value)}
                                                placeholder="e.g., 2.4 MB"
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
                                            />
                                        </div>
                                    </div>
                                    */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                            Select File
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            required
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddDocModal(false)}
                                        className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-[#5a4fcf] hover:bg-[#4a3fb8] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer"
                                    >
                                        Save & Add Document
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Icons
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
    );
}

function FolderEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            <line x1="9" y1="13" x2="15" y2="13" />
        </svg>
    );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
