"use client";

import { useState, useEffect, useCallback } from "react";
import { profileService } from "@/lib/services/profile.service";
import { useAuth } from "@/lib/context/auth-context";
import type { Profile, PublicProfile, UpdateProfilePayload } from "@/lib/types/api.types";
import { isAxiosError } from "axios";

/**
 * Hook for profile management:
 * - 5.1 GET /api/profiles/me
 * - 5.2 PATCH /api/profiles/me
 * - 5.3 GET /api/profiles/:userId (Public profile explorer)
 */
export function useProfile() {
    const { user, refreshSession } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Edit form states
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        full_name: "",
        avatar_url: "",
    });
    const [formErrors, setFormErrors] = useState<{
        username?: string;
        full_name?: string;
        avatar_url?: string;
    }>({});

    // 5.3 Public profile search states
    const [publicSearchId, setPublicSearchId] = useState("");
    const [publicProfile, setPublicProfile] = useState<PublicProfile | null>(null);
    const [isSearchingPublic, setIsSearchingPublic] = useState(false);
    const [publicSearchError, setPublicSearchError] = useState<string | null>(null);

    const initFormData = useCallback((p: Profile | null) => {
        setFormData({
            username: p?.username || "",
            full_name: p?.full_name || "",
            avatar_url: p?.avatar_url || "",
        });
        setFormErrors({});
    }, []);

    /** 5.1 GET /api/profiles/me */
    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await profileService.getMyProfile();
            setProfile(data);
            initFormData(data);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(
                    err.response?.data?.error ||
                    err.response?.data?.message ||
                    "Failed to load profile."
                );
            } else {
                setError("Failed to load profile.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [initFormData]);

    useEffect(() => {
        if (user) {
            fetchProfile();
        } else {
            setIsLoading(false);
        }
    }, [user, fetchProfile]);

    const handleStartEdit = () => {
        initFormData(profile);
        setError(null);
        setSaveSuccess(false);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        initFormData(profile);
        setFormErrors({});
        setIsEditing(false);
    };

    const validateForm = (): boolean => {
        const errors: { username?: string; full_name?: string; avatar_url?: string } = {};

        if (formData.username.trim() && formData.username.trim().length < 3) {
            errors.username = "Username must be at least 3 characters.";
        }

        if (formData.full_name.trim() && formData.full_name.trim().length < 1) {
            errors.full_name = "Full name must be at least 1 character.";
        }

        if (formData.avatar_url.trim()) {
            try {
                const url = new URL(formData.avatar_url.trim());
                if (!["http:", "https:"].includes(url.protocol)) {
                    errors.avatar_url = "Avatar URL must begin with http:// or https://";
                }
            } catch {
                errors.avatar_url = "Please enter a valid URL.";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    /** 5.2 PATCH /api/profiles/me */
    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!validateForm()) return;

        setIsSaving(true);
        setError(null);
        setSaveSuccess(false);

        const payload: UpdateProfilePayload = {};
        if (formData.username.trim()) payload.username = formData.username.trim();
        if (formData.full_name.trim()) payload.full_name = formData.full_name.trim();
        if (formData.avatar_url.trim()) payload.avatar_url = formData.avatar_url.trim();

        try {
            const updated = await profileService.updateMyProfile(payload);
            setProfile(updated);
            initFormData(updated);
            setIsEditing(false);
            setSaveSuccess(true);

            // Synchronize with header and global user session
            try {
                await refreshSession();
            } catch {
                // Ignore silent refresh error
            }

            setTimeout(() => setSaveSuccess(false), 4000);
        } catch (err) {
            if (isAxiosError(err)) {
                const msg =
                    err.response?.data?.error ||
                    err.response?.data?.message ||
                    "Failed to save profile changes.";
                setError(msg);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred while saving profile.");
            }
        } finally {
            setIsSaving(false);
        }
    };

    /** 5.3 GET /api/profiles/:userId */
    const handleSearchPublicProfile = async (targetId?: string) => {
        const idToSearch = (targetId || publicSearchId).trim();
        if (!idToSearch) {
            setPublicSearchError("Please enter a User ID to inspect.");
            return;
        }

        setIsSearchingPublic(true);
        setPublicSearchError(null);
        setPublicProfile(null);

        try {
            const data = await profileService.getPublicProfile(idToSearch);
            setPublicProfile(data);
        } catch (err) {
            if (isAxiosError(err)) {
                setPublicSearchError(
                    err.response?.data?.error ||
                    err.response?.data?.message ||
                    (err.response?.status === 404
                        ? `No public profile found for user ID "${idToSearch}".`
                        : "Failed to fetch public profile.")
                );
            } else {
                setPublicSearchError("Failed to fetch public profile.");
            }
        } finally {
            setIsSearchingPublic(false);
        }
    };

    const clearPublicProfile = () => {
        setPublicProfile(null);
        setPublicSearchError(null);
    };

    return {
        profile,
        user,
        isLoading,
        isSaving,
        error,
        saveSuccess,
        fetchProfile,
        isEditing,
        formData,
        setFormData,
        formErrors,
        handleStartEdit,
        handleCancelEdit,
        handleSave,
        // Public profile lookup
        publicSearchId,
        setPublicSearchId,
        publicProfile,
        isSearchingPublic,
        publicSearchError,
        handleSearchPublicProfile,
        clearPublicProfile,
    };
}
