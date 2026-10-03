import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api-client";
import type { RefreshResponse } from "@/lib/types/api.types";

/**
 * 4.3 Refresh Access Token
 *
 * Method: POST
 * Endpoint: /api/auth/refresh
 * Full URL: https://vedha-backend-9wy7.onrender.com/api/auth/refresh
 * Auth: Public
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body || !body.refresh_token) {
            return NextResponse.json(
                { error: "refresh_token is required in request body" },
                { status: 400 }
            );
        }

        const backendResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh_token: body.refresh_token,
            }),
        });

        const data: RefreshResponse | { error?: string; message?: string } =
            await backendResponse.json();

        return NextResponse.json(data, {
            status: backendResponse.status,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to refresh access token",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
