import React from "react";
import { FolderIcon, FolderEmptyIcon, PlusIcon, ArrowLeftIcon, EditIcon, TrashIcon } from "@/lib/icons";
import { Category, DocumentItem } from "../_hooks/use-document-categories";

interface CategoryDetailProps {
    selectedCategory: Category;
    categoryDocuments: DocumentItem[];
    onBack: () => void;
    onEditCategory: (cat: Category, e: React.MouseEvent) => void;
    onAddDocuments: () => void;
    onRemoveDoc: (docId: string, docName: string) => void;
}

export function CategoryDetail({
    selectedCategory,
    categoryDocuments,
    onBack,
    onEditCategory,
    onAddDocuments,
    onRemoveDoc,
}: CategoryDetailProps) {
    return (
        <div>
            {/* Breadcrumb & Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <button
                        onClick={onBack}
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
                        onClick={(e) => onEditCategory(selectedCategory, e)}
                        className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                    >
                        <EditIcon className="w-4 h-4 text-gray-500" />
                        <span>Edit Category</span>
                    </button>
                    <button
                        onClick={onAddDocuments}
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
                            onClick={onAddDocuments}
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
                                {categoryDocuments.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50/60 transition-colors group">
                                        <td className="py-4 pl-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#5a4fcf] font-bold text-xs flex items-center justify-center shrink-0">
                                                    {doc.type}
                                                </div>
                                                <span className="font-semibold text-gray-800 text-xs">{doc.name}</span>
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
                                            <button
                                                onClick={() => onRemoveDoc(doc.id, doc.name)}
                                                className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
                                                title="Remove from this category"
                                            >
                                                <TrashIcon className="w-3.5 h-3.5" />
                                                <span>Remove</span>
                                            </button>
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
