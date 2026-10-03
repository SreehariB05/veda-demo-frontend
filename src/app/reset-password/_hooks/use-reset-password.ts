"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/lib/services/auth.service";
import { isAxiosError } from "axios";

export function useResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [resendSuccessMessage, setResendSuccessMessage] = useState<string | null>(null);

    // Extract query params or URL hash if coming from an email link
    useEffect(() => {
        // Query param detection: ?email=...&otp=... or ?code=... or ?token=...
        const paramEmail = searchParams.get("email");
        const paramOtp =
            searchParams.get("otp") ||
            searchParams.get("code") ||
            searchParams.get("token");

        if (paramEmail) setEmail(paramEmail);
        if (paramOtp) setOtp(paramOtp);

        // Also check hash fragment if Supabase redirects with #access_token=...&type=recovery
        if (typeof window !== "undefined" && window.location.hash) {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const hashToken = params.get("access_token");
            const hashType = params.get("type");

            if (hashType === "recovery" && hashToken && !paramOtp) {
                setOtp(hashToken);
            }
        }
    }, [searchParams]);

    /** Submit password reset: POST /api/auth/reset-password */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setResendSuccessMessage(null);

        const trimmedEmail = email.trim();
        const trimmedOtp = otp.trim();

        if (!trimmedEmail) {
            setError("Please enter your email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!trimmedOtp) {
            setError("Please enter the verification code / OTP sent to your email.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        const hasUppercase = /[A-Z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        if (!hasUppercase || !hasNumber) {
            setError("Password must contain at least one uppercase letter and one number.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match. Please re-enter.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await authService.resetPassword({
                email: trimmedEmail,
                otp: trimmedOtp,
                new_password: newPassword,
            });

            setSuccessMessage(
                res.message || "Password updated successfully. You can now log in."
            );

            setTimeout(() => {
                router.push("/login");
            }, 1800);
        } catch (err) {
            if (isAxiosError(err)) {
                const data = err.response?.data;
                setError(
                    data?.error ||
                        data?.message ||
                        "Failed to reset password. Please verify your OTP code."
                );
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    /** Resend OTP: POST /api/auth/forgot-password */
    const handleResendOtp = async () => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError("Please enter your email address first to resend the code.");
            return;
        }

        setError(null);
        setResendSuccessMessage(null);
        setIsResending(true);

        try {
            const res = await authService.forgotPassword(trimmedEmail);
            setResendSuccessMessage(
                res.message || "Password reset code sent to your email"
            );
        } catch (err) {
            if (isAxiosError(err)) {
                const data = err.response?.data;
                setError(data?.error || data?.message || "Failed to resend code.");
            } else {
                setError("Failed to resend code. Please try again.");
            }
        } finally {
            setIsResending(false);
        }
    };

    return {
        email,
        setEmail,
        otp,
        setOtp,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        isLoading,
        isResending,
        error,
        successMessage,
        resendSuccessMessage,
        handleSubmit,
        handleResendOtp,
    };
}
