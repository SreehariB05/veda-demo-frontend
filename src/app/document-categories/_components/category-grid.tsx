import React from "react";
import { FolderIcon, PlusIcon, EditIcon, TrashIcon } from "@/lib/icons";
import { Category } from "../_hooks/use-document-categories";

interface CategoryCardProps {
    category: Category;
    docCount: number;
    onSelect: (id: string) => void;
    onEdit: (cat: Category, e: React.MouseEvent) => void;
    onDelete: (id: string, name: string, e: React.MouseEvent) => void;
}

export function CategoryCard({ category, docCount, onSelect, onEdit, onDelete }: CategoryCardProps) {
    return (
        <div
            onClick={() => onSelect(category.id)}
            className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-gray-200 overflow-hidden"
        >
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
                            onClick={(e) => onEdit(category, e)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
                            title="Edit Category"
                        >
                            <EditIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(category.id, category.name, e);
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
                <p className="text-xs text-gray-400 font-medium mb-6">Updated {category.updatedAt}</p>
            </div>
            <div className="w-full">
                <div
                    className="h-1.5 w-full rounded-full transition-all duration-300 group-hover:h-2"
                    style={{ backgroundColor: category.color }}
                />
            </div>
        </div>
    );
}

interface CategoryGridProps {
    categories: Category[];
    getDocumentCount: (catId: string) => number;
    searchQuery: string;
    onSelect: (id: string) => void;
    onEdit: (cat: Category, e: React.MouseEvent) => void;
    onDelete: (id: string, name: string, e: React.MouseEvent) => void;
    onCreateCategory: () => void;
}

export function CategoryGrid({ categories, getDocumentCount, searchQuery, onSelect, onEdit, onDelete, onCreateCategory }: CategoryGridProps) {
    if (categories.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <h3 className="text-base font-bold text-gray-800 mb-1">No categories found</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                    No categories matching &quot;{searchQuery}&quot;. Try a different keyword or create a new category.
                </p>
                <button
                    onClick={onCreateCategory}
                    className="px-4 py-2 bg-[#5a4fcf] text-white text-xs font-semibold rounded-xl hover:bg-[#4a3fb8] transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                    <PlusIcon className="w-3.5 h-3.5" />
                    <span>Add Category</span>
                </button>
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
                    onEdit={onEdit}
                    onDelete={(id, name, e) => { e.stopPropagation(); onDelete(id, name, e); }}
                />
            ))}
        </div>
    );
}
