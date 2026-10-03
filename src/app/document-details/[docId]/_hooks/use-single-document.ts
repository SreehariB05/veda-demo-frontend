"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { documentService } from "@/lib/services/document.service";
import type { Document, DocumentCategory, UpdateDocumentPayload } from "@/lib/types/api.types";
import apiClient from "@/lib/api-client";
import { isAxiosError } from "axios";

export function useSingleDocument(docId: string) {
    const router = useRouter();

    const [doc, setDoc] = useState<Document | null>(null);
    const [categories, setCategories] = useState<DocumentCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Decryption state (6.4 GET /api/documents/:docId/decrypt)
    const [decryptedData, setDecryptedData] = useState<Record<string, unknown> | null>(null);
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [isDecryptedVisible, setIsDecryptedVisible] = useState(false);
    const [decryptError, setDecryptError] = useState<string | null>(null);

    // Download state (6.5 GET /api/documents/:docId/file)
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);

    // Edit Modal state (6.8 PATCH /api/documents/:docId)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    // Delete state (6.9 DELETE /api/documents/:docId)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // 6.3 Fetch Document Metadata & categories taxonomy
    const fetchDoc = useCallback(async () => {
        if (!docId) return;
        setIsLoading(true);
        setError(null);
        try {
            const [documentData, catRes] = await Promise.allSettled([
                documentService.getDocument(docId),
                documentService.getCategories(),
            ]);

            if (documentData.status === "fulfilled") {
                setDoc(documentData.value);
            } else {
                setError("Unable to locate document or access is unauthorized.");
            }

            if (catRes.status === "fulfilled" && catRes.value?.categories) {
                setCategories(catRes.value.categories);
            }
        } catch (err) {
            console.error("Failed to load document", err);
            setError("Failed to retrieve document metadata.");
        } finally {
            setIsLoading(false);
        }
    }, [docId]);

    useEffect(() => {
        fetchDoc();
    }, [fetchDoc]);

    // 6.4 Decrypt Document Data
    const handleDecrypt = async () => {
        if (isDecryptedVisible) {
            setIsDecryptedVisible(false);
            return;
        }

        if (decryptedData) {
            setIsDecryptedVisible(true);
            return;
        }

        setIsDecrypting(true);
        setDecryptError(null);
        try {
            const result = await documentService.decryptDocument(docId);
            setDecryptedData(result.document_data || {});
            setIsDecryptedVisible(true);
            showToast("Document payload decrypted successfully.");
        } catch (err) {
            console.error("Decryption failed", err);
            if (isAxiosError(err)) {
                setDecryptError(err.response?.data?.error || "Decryption failed. Please try again.");
            } else {
                setDecryptError("Failed to decrypt document data.");
            }
        } finally {
            setIsDecrypting(false);
        }
    };

    // 6.5 Download & Decrypt Stored File
    const handleDownloadFile = async () => {
        setIsDownloading(true);
        setDownloadError(null);
        try {
            const res = await apiClient.get(`/documents/${docId}/file`, {
                responseType: "blob",
            });
            const rawContentType = res.headers["content-type"];
            const contentType = typeof rawContentType === "string" ? rawContentType : "application/octet-stream";
            const blob = new Blob([res.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            let ext = "";
            if (contentType.includes("pdf")) ext = ".pdf";
            else if (contentType.includes("jpeg") || contentType.includes("jpg")) ext = ".jpg";
            else if (contentType.includes("png")) ext = ".png";
            else if (contentType.includes("docx")) ext = ".docx";

            const safeTitle = (doc?.title || "document").replace(/[^a-zA-Z0-9_-]/g, "_");
            a.download = `${safeTitle}${ext}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            showToast("File downloaded and decrypted.");
        } catch (err) {
            console.error("File download failed", err);
            setDownloadError("No binary file stored for this document, or decryption failed.");
        } finally {
            setIsDownloading(false);
        }
    };

    // 6.8 Edit Document Metadata & Expiry Date
    const handleUpdate = async (payload: UpdateDocumentPayload) => {
        setIsSubmittingEdit(true);
        setEditError(null);
        try {
            const res = await documentService.updateDocument(docId, payload);
            setDoc(res.document);
            if (payload.document_data) {
                setDecryptedData(payload.document_data);
            }
            setIsEditModalOpen(false);
            showToast("Document updated successfully.");
        } catch (err) {
            console.error("Update failed", err);
            if (isAxiosError(err)) {
                setEditError(err.response?.data?.error || "Update failed.");
            } else {
                setEditError("Could not update document metadata.");
            }
        } finally {
            setIsSubmittingEdit(false);
        }
    };

    // 6.9 Delete Document
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await documentService.deleteDocument(docId);
            showToast("Document deleted successfully.");
            setTimeout(() => {
                router.push("/document-details");
            }, 800);
        } catch (err) {
            console.error("Delete failed", err);
            showToast("Failed to delete document.");
            setIsDeleting(false);
        }
    };

    return {
        doc,
        categories,
        isLoading,
        error,
        toastMessage,
        decryptedData,
        isDecrypting,
        isDecryptedVisible,
        decryptError,
        isDownloading,
        downloadError,
        isEditModalOpen,
        setIsEditModalOpen,
        isSubmittingEdit,
        editError,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isDeleting,
        handleDecrypt,
        handleDownloadFile,
        handleUpdate,
        handleDelete,
        refresh: fetchDoc,
    };
}
