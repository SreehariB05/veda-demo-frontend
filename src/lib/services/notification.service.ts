import apiClient from "@/lib/api-client";
import type {
    NotificationsResponse,
    UnreadCountResponse,
    ExpiringSummaryResponse,
    Notification,
} from "@/lib/types/api.types";

export const notificationService = {
    /** GET /api/notifications */
    listNotifications: async (params?: {
        status?: "unread" | "read" | "archived";
        type?: "expiry_warning" | "document_expired" | "verification_status";
        limit?: number;
    }): Promise<NotificationsResponse> => {
        const { data } = await apiClient.get<NotificationsResponse>(
            "/notifications",
            { params }
        );
        return data;
    },

    /** GET /api/notifications/unread-count */
    getUnreadCount: async (): Promise<UnreadCountResponse> => {
        const { data } = await apiClient.get<UnreadCountResponse>(
            "/notifications/unread-count"
        );
        return data;
    },

    /** GET /api/notifications/expiring-summary */
    getExpiringSummary: async (): Promise<ExpiringSummaryResponse> => {
        const { data } = await apiClient.get<ExpiringSummaryResponse>(
            "/notifications/expiring-summary"
        );
        return data;
    },

    /** PATCH /api/notifications/:id/read */
    markAsRead: async (
        id: string
    ): Promise<{ message: string; notification: Partial<Notification> }> => {
        const { data } = await apiClient.patch(`/notifications/${id}/read`);
        return data;
    },

    /** PATCH /api/notifications/read-all */
    markAllAsRead: async (): Promise<{ message: string; marked_count: number }> => {
        const { data } = await apiClient.patch("/notifications/read-all");
        return data;
    },

    /** DELETE /api/notifications/:id */
    deleteNotification: async (id: string): Promise<void> => {
        await apiClient.delete(`/notifications/${id}`);
    },

    /** POST /api/notifications/check-expiry */
    triggerExpiryCheck: async (): Promise<{
        message: string;
        checked: number;
        created: number;
        skipped: number;
    }> => {
        const { data } = await apiClient.post("/notifications/check-expiry");
        return data;
    },
};
