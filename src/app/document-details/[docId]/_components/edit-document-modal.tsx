"use client";

import React, { useState, useEffect } from "react";
import { CloseIcon, PlusIcon, TrashIcon } from "@/lib/icons";
import type { Document, DocumentCategory, UpdateDocumentPayload } from "@/lib/types/api.types";

interface EditDocumentModalProps {
    doc: Document;
    categories: DocumentCategory[];
    initialDocumentData?: Record<string, unknown> | null;
    isOpen: boolean;
    isSubmitting: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (payload: UpdateDocumentPayload) => Promise<void>;
}

export function EditDocumentModal({
    doc,
    categories,
    initialDocumentData,
    isOpen,
    isSubmitting,
    error,
    onClose,
    onSubmit,
}: EditDocumentModalProps) {
    const [title, setTitle] = useState(doc.title);
    const [type, setType] = useState(doc.type);
    const [category, setCategory] = useState(doc.category || "other");
    const [subcategory, setSubcategory] = useState(doc.subcategory || "general");
    const [expiryDate, setExpiryDate] = useState(
        doc.expiry_date ? doc.expiry_date.split("T")[0] : ""
    );
    const [removeExpiry, setRemoveExpiry] = useState(false);

    // Custom data payload fields
    const [customFields, setCustomFields] = useState<Array<{ key: string; value: string }>>([]);

    useEffect(() => {
        setTitle(doc.title);
        setType(doc.type);
        setCategory(doc.category || "other");
        setSubcategory(doc.subcategory || "general");
        setExpiryDate(doc.expiry_date ? doc.expiry_date.split("T")[0] : "");
        setRemoveExpiry(false);

        if (initialDocumentData && Object.keys(initialDocumentData).length > 0) {
            setCustomFields(
                Object.entries(initialDocumentData).map(([k, v]) => ({
                    key: k,
                    value: String(v ?? ""),
                }))
            );
        }
    }, [doc, initialDocumentData, isOpen]);

    if (!isOpen) return null;

    const activeCat = categories.find((c) => c.id === category);
    const availableSubcategories = activeCat?.subcategories || [];

    const handleCategoryChange = (newCatId: string) => {
        setCategory(newCatId);
        const catObj = categories.find((c) => c.id === newCatId);
        if (catObj && catObj.subcategories.length > 0) {
            setSubcategory(catObj.subcategories[0].id);
        } else {
            setSubcategory("general");
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: UpdateDocumentPayload = {
            title: title.trim(),
            type,
            category,
            subcategory,
            expiry_date: removeExpiry ? null : expiryDate || null,
        };

        if (customFields.length > 0) {
            const dataObj: Record<string, unknown> = {};
            customFields.forEach(({ key, value }) => {
                const trimmedKey = key.trim();
                if (trimmedKey) {
                    dataObj[trimmedKey] = value.trim();
                }
            });
            if (Object.keys(dataObj).length > 0) {
                payload.document_data = dataObj;
            }
        }

        await onSubmit(payload);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-bold text-[#1a172c]">Edit Document Metadata</h2>
                        <p className="text-xs text-gray-400">
                            Update document classification, expiration, or encrypted payload
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <CloseIcon className="w-4 h-4" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs px-4 py-2.5 rounded-xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Document Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] cursor-pointer"
                            >
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                Subcategory
                            </label>
                            <select
                                value={subcategory}
                                onChange={(e) => setSubcategory(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] cursor-pointer"
                            >
                                {availableSubcategories.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                                {!availableSubcategories.some((s) => s.id === subcategory) && (
                                    <option value={subcategory}>{subcategory}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                Document Type
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] cursor-pointer"
                            >
                                <option value="identity">Identity</option>
                                <option value="educational">Educational</option>
                                <option value="financial">Financial</option>
                                <option value="medical">Medical</option>
                                <option value="legal">Legal</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Expiry Date
                                </label>
                                <label className="text-[11px] text-gray-500 flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={removeExpiry}
                                        onChange={(e) => setRemoveExpiry(e.target.checked)}
                                        className="rounded text-[#5a4fcf]"
                                    />
                                    <span>Remove date</span>
                                </label>
                            </div>
                            <input
                                type="date"
                                disabled={removeExpiry}
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] disabled:opacity-40"
                            />
                        </div>
                    </div>

                    {/* Encrypted Data Attributes */}
                    <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Encrypted Attributes (document_data)
                            </label>
                            <button
                                type="button"
                                onClick={() =>
                                    setCustomFields((prev) => [...prev, { key: "", value: "" }])
                                }
                                className="text-xs text-[#5a4fcf] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                            >
                                <PlusIcon className="w-3 h-3" />
                                <span>Add attribute</span>
                            </button>
                        </div>

                        <div className="space-y-2">
                            {customFields.map((field, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Key (e.g. passport_number)"
                                        value={field.key}
                                        onChange={(e) => {
                                            const next = [...customFields];
                                            next[idx].key = e.target.value;
                                            setCustomFields(next);
                                        }}
                                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={field.value}
                                        onChange={(e) => {
                                            const next = [...customFields];
                                            next[idx].value = e.target.value;
                                            setCustomFields(next);
                                        }}
                                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCustomFields((prev) => prev.filter((_, i) => i !== idx))
                                        }
                                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                                    >
                                        <TrashIcon className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2.5 bg-[#5a4fcf] hover:bg-[#4a3fb8] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-50 cursor-pointer"
                        >
                            {isSubmitting ? "Saving Changes…" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
