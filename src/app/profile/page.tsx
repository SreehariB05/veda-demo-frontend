"use client";

import DashSidebar from "../components/dash-sidebar";
import DashHeader from "../components/dash-header";
import {
    ProfileInfoCard,
    ProfileEditCard,
    CryptoCredentialsCard,
    PublicProfileExplorerCard,
} from "./_components/profile-cards";
import { useProfile } from "./_hooks/use-profile";
import React from "react";
import { AlertTriangleIcon, CheckIcon } from "@/lib/icons";

export default function ProfilePage() {
    const {
        profile,
        user,
        isLoading,
        isSaving,
        error,
        saveSuccess,
        isEditing,
        formData,
        setFormData,
        formErrors,
        handleStartEdit,
        handleCancelEdit,
        handleSave,
        publicSearchId,
        setPublicSearchId,
        publicProfile,
        isSearchingPublic,
        publicSearchError,
        handleSearchPublicProfile,
        clearPublicProfile,
    } = useProfile();

    return (
        <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans text-gray-800">
            <DashHeader />

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                <DashSidebar page="profile" />

                {/* Main Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1a172c] mb-1">User Profile</h1>
                            <p className="text-sm text-gray-500 font-medium">
                                Manage identity proofs, update personal details, and inspect public profiles
                            </p>
                        </div>
                    </div>

                    {/* Global Notifications */}
                    {saveSuccess && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-xs animate-fade-in font-medium">
                            <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Profile updated successfully! Header avatar and user session updated.</span>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 shadow-xs animate-fade-in font-medium">
                            <AlertTriangleIcon className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Main Profile Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-6">
                        {isEditing ? (
                            <ProfileEditCard
                                formData={formData}
                                setFormData={setFormData}
                                formErrors={formErrors}
                                isSaving={isSaving}
                                onSave={handleSave}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <ProfileInfoCard
                                profile={profile}
                                email={user?.email}
                                isLoading={isLoading}
                                onEdit={handleStartEdit}
                            />
                        )}

                        <CryptoCredentialsCard profile={profile} />
                    </div>

                    {/* Public Profile Explorer (5.3 GET /api/profiles/:userId) */}
                    <div className="max-w-4xl">
                        <PublicProfileExplorerCard
                            currentUserId={profile?.id}
                            searchId={publicSearchId}
                            setSearchId={setPublicSearchId}
                            publicProfile={publicProfile}
                            isSearching={isSearchingPublic}
                            error={publicSearchError}
                            onSearch={handleSearchPublicProfile}
                            onClear={clearPublicProfile}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
