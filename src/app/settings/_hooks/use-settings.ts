"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { isAxiosError } from "axios";

/**
 * Hook for settings page state and actions including Delete Account.
 */
export function useSettings() {
    const router = useRouter();
    const { deleteAccount, user } = useAuth();

    const [emailNotifications, setEmailNotifications] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    // Delete Account states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

    const openDeleteModal = () => {
        setConfirmText("");
        setDeleteError(null);
        setDeleteSuccess(null);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        if (isDeleting) return;
        setIsDeleteModalOpen(false);
        setConfirmText("");
        setDeleteError(null);
    };

    const handleDeleteAccount = async () => {
        if (confirmText.trim() !== "DELETE") {
            setDeleteError('Please type "DELETE" to confirm account deletion.');
            return;
        }

        setIsDeleting(true);
        setDeleteError(null);

        try {
            const res = await deleteAccount();
            setDeleteSuccess(res?.message || "Account successfully deleted");
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (err) {
            if (isAxiosError(err)) {
                const msg =
                    err.response?.data?.error ||
                    err.response?.data?.message ||
                    "Failed to delete account. Please try again.";
                setDeleteError(msg);
            } else if (err instanceof Error) {
                setDeleteError(err.message);
            } else {
                setDeleteError("An unexpected error occurred while deleting account.");
            }
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        emailNotifications,
        setEmailNotifications,
        twoFactorEnabled,
        setTwoFactorEnabled,
        user,
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        confirmText,
        setConfirmText,
        isDeleting,
        deleteError,
        deleteSuccess,
        handleDeleteAccount,
    };
}
