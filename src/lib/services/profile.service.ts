import apiClient from "@/lib/api-client";
import type { Profile, PublicProfile, UpdateProfilePayload } from "@/lib/types/api.types";

export const profileService = {
    /** GET /api/profiles/me */
    getMyProfile: async (): Promise<Profile> => {
        const { data } = await apiClient.get<Profile>("/profiles/me");
        return data;
    },

    /** PATCH /api/profiles/me */
    updateMyProfile: async (payload: UpdateProfilePayload): Promise<Profile> => {
        const { data } = await apiClient.patch<Profile>("/profiles/me", payload);
        return data;
    },

    /** GET /api/profiles/:userId */
    getPublicProfile: async (userId: string): Promise<PublicProfile> => {
        const { data } = await apiClient.get<PublicProfile>(`/profiles/${userId}`);
        return data;
    },
};
