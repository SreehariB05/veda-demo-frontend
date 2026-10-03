"use client";

import { useState, useEffect, useCallback } from "react";
import { documentService } from "@/lib/services/document.service";
import { notificationService } from "@/lib/services/notification.service";
import { useAuth } from "@/lib/context/auth-context";
import type { Document, ExpiringSummaryResponse } from "@/lib/types/api.types";

/**
 * Hook for the dashboard page.
 * Fetches recent documents, unread notification count, and expiry summary.
 */
export function useDashboard() {
    const { profile } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [documents, setDocuments] = useState<Document[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [expirySummary, setExpirySummary] = useState<ExpiringSummaryResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [docs, unread, summary] = await Promise.all([
                documentService.listDocuments(),
                notificationService.getUnreadCount(),
                notificationService.getExpiringSummary(),
            ]);
            setDocuments(docs);
            setUnreadCount(unread.unread_count);
            setExpirySummary(summary);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError("Failed to load dashboard data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const filteredDocuments = documents.filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Stats derived from real data
    const stats = {
        totalDocuments: documents.length,
        sharedToday: 0, // Will be populated from token service if needed
        expiringSoon: expirySummary
            ? expirySummary.critical_7_days.length + expirySummary.warning_30_days.length
            : 0,
        recentActivity: unreadCount,
    };

    return {
        profile,
        searchQuery,
        setSearchQuery,
        documents: filteredDocuments,
        stats,
        isLoading,
        error,
        refresh: fetchDashboardData,
    };
}
