import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api-client";
import type { DeleteAccountResponse } from "@/lib/types/api.types";

/**
 * 4.8 Delete Account
 *
 * Method: DELETE
 * Endpoint: /api/auth/delete
 * Full URL: https://vedha-backend-9wy7.onrender.com/api/auth/delete
 * Auth: Required (Bearer <access_token>)
 *
 * Response (200 OK):
 * {
 *   "message": "Account successfully deleted"
 * }
 */
export async function DELETE(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json(
                { error: "Authorization header is required (Bearer <access_token>)" },
                { status: 401 }
            );
        }

        const backendResponse = await fetch(`${BASE_URL}/api/auth/delete`, {
            method: "DELETE",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
        });

        const contentType = backendResponse.headers.get("content-type");
        let data: DeleteAccountResponse | { error?: string; message?: string };
        if (contentType && contentType.includes("application/json")) {
            data = await backendResponse.json();
        } else {
            const text = await backendResponse.text();
            data = {
                message:
                    text ||
                    (backendResponse.ok
                        ? "Account successfully deleted"
                        : "Failed to delete account"),
            };
        }

        return NextResponse.json(data, {
            status: backendResponse.status,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to delete account",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
