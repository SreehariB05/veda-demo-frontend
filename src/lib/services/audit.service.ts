import apiClient from "@/lib/api-client";
import type { AuditLog } from "@/lib/types/api.types";

export const auditService = {
    /** GET /api/logs?document_id=<uuid> */
    getLogs: async (params?: { document_id?: string }): Promise<AuditLog[]> => {
        const { data } = await apiClient.get<AuditLog[]>("/logs", { params });
        return data;
    },
};
