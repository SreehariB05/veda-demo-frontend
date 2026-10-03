import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api-client";
import type { ResetPasswordResponse } from "@/lib/types/api.types";

/**
 * 4.5 Reset Password With OTP
 *
 * Method: POST
 * Endpoint: /api/auth/reset-password
 * Full URL: https://vedha-backend-9wy7.onrender.com/api/auth/reset-password
 * Auth: Public
 *
 * Request Body:
 * {
 *   "email": "user@example.com",
 *   "otp": "123456",
 *   "new_password": "NewPassword123"
 * }
 *
 * Response (200 OK):
 * {
 *   "message": "Password updated successfully. You can now log in."
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body || !body.email || !body.otp || !body.new_password) {
            return NextResponse.json(
                { error: "email, otp, and new_password are required in request body" },
                { status: 400 }
            );
        }

        const backendResponse = await fetch(`${BASE_URL}/api/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: body.email.trim(),
                otp: body.otp.trim(),
                new_password: body.new_password,
            }),
        });

        const data: ResetPasswordResponse | { error?: string; message?: string } =
            await backendResponse.json();

        return NextResponse.json(data, {
            status: backendResponse.status,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to reset password",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
