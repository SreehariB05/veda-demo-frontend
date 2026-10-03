import React from "react";
import { CloseIcon, CheckIcon, PlusIcon } from "@/lib/icons";
import { Category, COLOR_THEMES, DocumentItem } from "../_hooks/use-document-categories";

// ─────────────────────────────────────────────────────────
// Add / Edit Category Modal
// ─────────────────────────────────────────────────────────

interface CategoryModalProps {
    editingCategory: Category | null;
    categoryNameInput: string;
    setCategoryNameInput: (v: string) => void;
    selectedThemeIndex: number;
    setSelectedThemeIndex: (i: number) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

export function CategoryModal({
    editingCategory,
    categoryNameInput,
    setCategoryNameInput,
    selectedThemeIndex,
    setSelectedThemeIndex,
    onSubmit,
    onClose,
}: CategoryModalProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-[#1a172c]">
                        {editingCategory ? "Edit Category" : "Create New Category"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <CloseIcon className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                required
                                autoFocus
                                value={categoryNameInput}
                                onChange={(e) => setCategoryNameInput(e.target.value)}
                                placeholder="e.g., Health & Medical, Invoices, Passports..."
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
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
                                        className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                                            selectedThemeIndex === idx
                                                ? "border-[#5a4fcf] bg-indigo-50/50 shadow-xs"
                                                : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                                        <span className="truncate">{t.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
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
    );
}

// ─────────────────────────────────────────────────────────
// Add / Assign Documents to Category Modal
// ─────────────────────────────────────────────────────────

interface AddDocModalProps {
    selectedCategory: Category;
    docModalTab: "assign" | "create";
    setDocModalTab: (tab: "assign" | "create") => void;
    availableToAssignDocuments: DocumentItem[];
    selectedDocIdsToAssign: string[];
    setSelectedDocIdsToAssign: React.Dispatch<React.SetStateAction<string[]>>;
    categories: Category[];
    onAssignDocs: () => void;
    onFileUpload: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}

export function AddDocModal({
    selectedCategory,
    docModalTab,
    setDocModalTab,
    availableToAssignDocuments,
    selectedDocIdsToAssign,
    setSelectedDocIdsToAssign,
    categories,
    onAssignDocs,
    onFileUpload,
    onClose,
}: AddDocModalProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-[#1a172c]">Add Documents to {selectedCategory.name}</h2>
                        <p className="text-xs text-gray-400">Choose how you want to add documents</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <CloseIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 mb-5">
                    {(["assign", "create"] as const).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setDocModalTab(tab)}
                            className={`pb-2.5 px-4 text-xs font-semibold border-b-2 cursor-pointer transition-all ${
                                docModalTab === tab
                                    ? "border-[#5a4fcf] text-[#5a4fcf]"
                                    : "border-transparent text-gray-400 hover:text-gray-700"
                            }`}
                        >
                            {tab === "assign"
                                ? `Select Existing Files (${availableToAssignDocuments.length})`
                                : "Create / Upload New"}
                        </button>
                    ))}
                </div>

                {docModalTab === "assign" ? (
                    <div>
                        {availableToAssignDocuments.length === 0 ? (
                            <div className="py-8 text-center text-gray-400 text-xs">
                                All your existing documents are already in this category. Switch tabs to upload a new one!
                            </div>
                        ) : (
                            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 mb-5">
                                {availableToAssignDocuments.map((doc) => {
                                    const isSelected = selectedDocIdsToAssign.includes(doc.id);
                                    const currentCat = categories.find((c) => c.id === doc.categoryId);
                                    return (
                                        <div
                                            key={doc.id}
                                            onClick={() =>
                                                setSelectedDocIdsToAssign((prev) =>
                                                    isSelected ? prev.filter((id) => id !== doc.id) : [...prev, doc.id]
                                                )
                                            }
                                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                                isSelected
                                                    ? "border-[#5a4fcf] bg-indigo-50/40"
                                                    : "border-gray-100 hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                                                        isSelected ? "bg-[#5a4fcf] border-[#5a4fcf] text-white" : "border-gray-300"
                                                    }`}
                                                >
                                                    {isSelected && <CheckIcon className="w-2.5 h-2.5" />}
                                                </div>
                                                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#5a4fcf] font-bold text-xs flex items-center justify-center shrink-0">
                                                    {doc.type}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-800">{doc.name}</p>
                                                    {currentCat && (
                                                        <p className="text-xs text-gray-400">{currentCat.name}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">{doc.size}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-400 font-medium">{selectedDocIdsToAssign.length} selected</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={selectedDocIdsToAssign.length === 0}
                                    onClick={onAssignDocs}
                                    className="px-5 py-2.5 bg-[#5a4fcf] hover:bg-[#4a3fb8] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer"
                                >
                                    Add Selected Documents
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onFileUpload}>
                        <div className="space-y-4 mb-5">
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
                                onClick={onClose}
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
    );
}
