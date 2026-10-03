"use client";

import React from "react";
import { TrashIcon, CloseIcon } from "@/lib/icons";

interface DeleteDocumentModalProps {
    title: string;
    isOpen: boolean;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export function DeleteDocumentModal({
    title,
    isOpen,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteDocumentModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                        <TrashIcon className="w-5 h-5" />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <CloseIcon className="w-4 h-4" />
                    </button>
                </div>

                <h2 className="text-lg font-bold text-[#1a172c] mb-1">Delete Document?</h2>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                    Are you sure you want to permanently delete <strong className="text-gray-800">&quot;{title}&quot;</strong>?
                    This will delete the document metadata and remove any encrypted file buffers from storage (6.9).
                    This action cannot be undone.
                </p>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={onConfirm}
                        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-rose-100 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                    >
                        {isDeleting ? "Deleting…" : "Permanently Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
