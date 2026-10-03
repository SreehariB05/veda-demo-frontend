"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { documentService } from "@/lib/services/document.service";
import { isAxiosError } from "axios";

/**
 * Hook for document upload page.
 * Handles file selection and POST /api/documents/upload.
 */
export function useDocumentUpload() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("identity");
    const [category, setCategory] = useState("other");
    const [subcategory, setSubcategory] = useState("general");
    const [expiryDate, setExpiryDate] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFileSelect = useCallback((file: File) => {
        setSelectedFile(file);
        // Auto-populate title from filename if empty
        if (!title) {
            setTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "));
        }
    }, [title]);

    const handleUpload = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }
        if (!title.trim()) {
            setError("Please provide a document title.");
            return;
        }

        setError(null);
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("title", title.trim());
            formData.append("type", type);
            formData.append("category", category);
            formData.append("subcategory", subcategory);
            if (expiryDate) {
                formData.append("expiry_date", expiryDate);
            }

            await documentService.uploadDocument(formData);
            setSuccess(true);
            setTimeout(() => router.push("/document-details"), 1500);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(
                    err.response?.data?.error || "Upload failed. Please try again."
                );
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsUploading(false);
        }
    };

    return {
        selectedFile,
        title, setTitle,
        type, setType,
        category, setCategory,
        subcategory, setSubcategory,
        expiryDate, setExpiryDate,
        isUploading,
        error,
        success,
        handleFileSelect,
        handleUpload,
    };
}
