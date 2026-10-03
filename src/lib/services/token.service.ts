import apiClient from "@/lib/api-client";
import type {
    Token,
    GenerateTokenPayload,
    VerifyTokenResponse,
} from "@/lib/types/api.types";

export const tokenService = {
    /** POST /api/tokens — generate a QR/share token */
    generateToken: async (payload: GenerateTokenPayload): Promise<Token> => {
        const { data } = await apiClient.post<Token>("/tokens", payload);
        return data;
    },

    /** GET /api/tokens/verify/:token — public scanner endpoint */
    verifyToken: async (token: string): Promise<VerifyTokenResponse> => {
        const { data } = await apiClient.get<VerifyTokenResponse>(
            `/tokens/verify/${token}`
        );
        return data;
    },

    /** GET /api/tokens?document_id=<uuid> */
    listTokensForDocument: async (documentId: string): Promise<Token[]> => {
        const { data } = await apiClient.get<Token[]>("/tokens", {
            params: { document_id: documentId },
        });
        return data;
    },

    /** DELETE /api/tokens/:tokenId */
    revokeToken: async (tokenId: string): Promise<void> => {
        await apiClient.delete(`/tokens/${tokenId}`);
    },
};
