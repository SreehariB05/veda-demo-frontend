"use client";

import React, { useRef } from "react";
import { UploadIcon } from "@/lib/icons";
import { useDocumentUpload } from "../_hooks/use-document-upload";

export function UploadDropzone() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        selectedFile,
        title, setTitle,
        expiryDate, setExpiryDate,
        isUploading,
        error,
        success,
        handleFileSelect,
        handleUpload,
    } = useDocumentUpload();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileSelect(file);
    };

    return (
        <form onSubmit={handleUpload} className="space-y-6 max-w-xl">
            {/* Error / Success */}
            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
                    Document uploaded! Redirecting…
                </div>
            )}

            {/* Dropzone */}
            <div
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-14 flex flex-col items-center justify-center gap-4 text-center cursor-pointer hover:border-[#5a4fcf] transition-colors"
            >
                <div className="w-16 h-16 rounded-full bg-[#f4f2ff] flex items-center justify-center">
                    <UploadIcon className="w-8 h-8 text-[#5a4fcf]" />
                </div>
                {selectedFile ? (
                    <div>
                        <p className="text-sm font-semibold text-[#1a172c]">{selectedFile.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className="text-base font-semibold text-[#1a172c]">
                            Drag & drop or click to select
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            PDF, DOCX, or IMG — max 25 MB
                        </p>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={onFileChange}
                />
            </div>

            {/* Metadata Fields */}
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Document Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Indian Passport, Degree Certificate"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Expiry Date (optional)
                    </label>
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5a4fcf]/20 focus:border-[#5a4fcf] transition-all"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isUploading || !selectedFile || success}
                className="w-full px-6 py-3 bg-[#5a4fcf] text-white text-sm font-semibold rounded-xl hover:bg-[#4a3fb8] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isUploading ? "Uploading…" : "Upload Document"}
            </button>
        </form>
    );
}
