"use client";

import DashSidebar from "../components/dash-sidebar";
import DashHeader from "../components/dash-header";
import { SearchIcon, PlusIcon } from "@/lib/icons";
import { CategoryGrid } from "./_components/category-grid";
import { CategoryDetail } from "./_components/category-detail";
import { CategoryModal, AddDocModal } from "./_components/category-modals";
import { useDocumentCategories } from "./_hooks/use-document-categories";
import React from "react";

export default function DocumentCategoriesPage() {
    const {
        categories,
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
    } = useDocumentCategories();

    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans text-gray-800">
            <DashHeader />

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#1a172c] text-white text-sm px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                <DashSidebar page="document-categories" />

                <main className="flex-1 p-8 overflow-y-auto">
                    {selectedCategory ? (
                        <CategoryDetail
                            selectedCategory={selectedCategory}
                            categoryDocuments={categoryDocuments}
                            onBack={() => setSelectedCategoryId(null)}
                            onEditCategory={openEditCategory}
                            onAddDocuments={() => {
                                setSelectedDocIdsToAssign([]);
                                setDocModalTab("assign");
                                setShowAddDocModal(true);
                            }}
                            onRemoveDoc={handleRemoveDocFromCategory}
                        />
                    ) : (
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

                            <CategoryGrid
                                categories={filteredCategories}
                                getDocumentCount={getDocumentCount}
                                searchQuery={searchQuery}
                                onSelect={setSelectedCategoryId}
                                onEdit={openEditCategory}
                                onDelete={(id, name) => handleDeleteCategory(id, name)}
                                onCreateCategory={openCreateCategory}
                            />
                        </div>
                    )}
                </main>
            </div>

            {/* Category Modal */}
            {showAddCategoryModal && (
                <CategoryModal
                    editingCategory={editingCategory}
                    categoryNameInput={categoryNameInput}
                    setCategoryNameInput={setCategoryNameInput}
                    selectedThemeIndex={selectedThemeIndex}
                    setSelectedThemeIndex={setSelectedThemeIndex}
                    onSubmit={handleSaveCategory}
                    onClose={() => setShowAddCategoryModal(false)}
                />
            )}

            {/* Add Documents Modal */}
            {showAddDocModal && selectedCategory && (
                <AddDocModal
                    selectedCategory={selectedCategory}
                    docModalTab={docModalTab}
                    setDocModalTab={setDocModalTab}
                    availableToAssignDocuments={availableToAssignDocuments}
                    selectedDocIdsToAssign={selectedDocIdsToAssign}
                    setSelectedDocIdsToAssign={setSelectedDocIdsToAssign}
                    categories={categories}
                    onAssignDocs={handleAssignDocs}
                    onFileUpload={handleFileUpload}
                    onClose={() => setShowAddDocModal(false)}
                />
            )}
        </div>
    );
}
