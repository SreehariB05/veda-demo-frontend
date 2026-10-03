import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api-client";
import type { Profile } from "@/lib/types/api.types";

/**
 * 5.1 Get My Profile
 *
 * Method: GET
 * Endpoint: /api/profiles/me
 * Full URL: https://vedha-backend-9wy7.onrender.com/api/profiles/me
 * Auth: Required (Bearer <access_token>)
 *
 * Response (200 OK):
 * {
 *   "id": "...",
 *   "username": "yadhukrishna",
 *   "full_name": "Yadhu Krishna",
 *   "avatar_url": "https://...",
 *   "updated_at": "..."
 * }
 */
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json(
                { error: "Authorization header is required (Bearer <access_token>)" },
                { status: 401 }
            );
        }

        const backendResponse = await fetch(`${BASE_URL}/api/profiles/me`, {
            method: "GET",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
        });

        const contentType = backendResponse.headers.get("content-type");
        let data: Profile | { error?: string; message?: string };
        if (contentType && contentType.includes("application/json")) {
            data = await backendResponse.json();
        } else {
            const text = await backendResponse.text();
            data = {
                message:
                    text ||
                    (backendResponse.ok ? "Success" : "Failed to fetch profile"),
            };
        }

        return NextResponse.json(data, {
            status: backendResponse.status,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to get profile",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

/**
 * 5.2 Update My Profile
 *
 * Method: PATCH
 * Endpoint: /api/profiles/me
 * Full URL: https://vedha-backend-9wy7.onrender.com/api/profiles/me
 * Auth: Required (Bearer <access_token>)
 *
 * Request Body:
 * {
 *   "username": "yadhu_krishna",     (optional, min 3 characters)
 *   "full_name": "Yadhu Krishna T M", (optional, min 1 character)
 *   "avatar_url": "https://..."       (optional, valid URL)
 * }
 *
 * Response (200 OK):
 * {
 *   "id": "...",
 *   "username": "yadhu_krishna",
 *   "full_name": "Yadhu Krishna T M",
 *   "avatar_url": "https://...",
 *   "updated_at": "..."
 * }
 */
export async function PATCH(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json(
                { error: "Authorization header is required (Bearer <access_token>)" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const backendResponse = await fetch(`${BASE_URL}/api/profiles/me`, {
            method: "PATCH",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const contentType = backendResponse.headers.get("content-type");
        let data: Profile | { error?: string; message?: string };
        if (contentType && contentType.includes("application/json")) {
            data = await backendResponse.json();
        } else {
            const text = await backendResponse.text();
            data = {
                message:
                    text ||
                    (backendResponse.ok ? "Success" : "Failed to update profile"),
            };
        }

        return NextResponse.json(data, {
            status: backendResponse.status,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to update profile",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
