import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api-client";
import type { ForgotPasswordResponse } from "@/lib/types/api.types";

/**
 * 4.4 Forgot Password (Send Reset OTP)
 *
 * Method: POST
 * Endpoint: /api/auth/forgot-password
 * Full URL: https://vedha-backend-9wy7.onrender.com/api/auth/forgot-password
 * Auth: Public
 *
 * Request Body:
 * {
 *   "email": "user@example.com"
 * }
 *
 * Response (200 OK):
 * {
 *   "message": "Password reset code sent to your email"
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body || !body.email || typeof body.email !== "string" || !body.email.trim()) {
            return NextResponse.json(
                { error: "email is required in request body" },
                { status: 400 }
            );
        }

        const backendResponse = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: body.email.trim(),
            }),
        });

        const data: ForgotPasswordResponse | { error?: string; message?: string } =
            await backendResponse.json();

        return NextResponse.json(data, {
            status: backendResponse.status,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to send password reset code",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
