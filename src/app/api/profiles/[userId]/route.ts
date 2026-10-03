import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api-client";
import type { PublicProfile } from "@/lib/types/api.types";

/**
 * 5.3 Get Any Public Profile
 *
 * Method: GET
 * Endpoint: /api/profiles/:userId
 * Full URL: https://vedha-backend-9wy7.onrender.com/api/profiles/:userId
 * Auth: Public / Optional
 *
 * Response (200 OK):
 * {
 *   "id": "...",
 *   "username": "...",
 *   "full_name": "...",
 *   "avatar_url": "..."
 * }
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await context.params;

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required in URL path" },
                { status: 400 }
            );
        }

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        const authHeader = request.headers.get("authorization");
        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const backendResponse = await fetch(`${BASE_URL}/api/profiles/${encodeURIComponent(userId)}`, {
            method: "GET",
            headers,
        });

        const contentType = backendResponse.headers.get("content-type");
        let data: PublicProfile | { error?: string; message?: string };
        if (contentType && contentType.includes("application/json")) {
            data = await backendResponse.json();
        } else {
            const text = await backendResponse.text();
            data = {
                message:
                    text ||
                    (backendResponse.ok ? "Success" : "Failed to fetch public profile"),
            };
        }

        return NextResponse.json(data, {
            status: backendResponse.status,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to get public profile",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
