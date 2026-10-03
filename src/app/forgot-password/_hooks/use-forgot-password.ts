"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/auth.service";
import { isAxiosError } from "axios";

export function useForgotPassword() {
    const router = useRouter();

    // Step 1: "send_otp", Step 2: "verify_reset"
    const [step, setStep] = useState<"send_otp" | "verify_reset">("send_otp");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    /** Step 1: POST /api/auth/forgot-password */
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError("Please enter your email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await authService.forgotPassword(trimmedEmail);
            setSuccessMessage(res.message || "Password reset code sent to your email");
            setStep("verify_reset");
        } catch (err) {
            if (isAxiosError(err)) {
                const data = err.response?.data;
                setError(data?.error || data?.message || "Failed to send reset code. Please check your email.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    /** Step 2: POST /api/auth/reset-password */
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!otp.trim()) {
            setError("Please enter the reset code sent to your email.");
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

        setIsLoading(true);
        try {
            const res = await authService.resetPassword({
                email: email.trim(),
                otp: otp.trim(),
                new_password: newPassword,
            });
            setSuccessMessage(res.message || "Password updated successfully! Redirecting to login…");
            setTimeout(() => {
                router.push("/login");
            }, 1800);
        } catch (err) {
            if (isAxiosError(err)) {
                const data = err.response?.data;
                setError(data?.error || data?.message || "Failed to reset password. Please verify your OTP code.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    /** Resend OTP */
    const handleResendOtp = async () => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError("Please enter your email address.");
            return;
        }

        setError(null);
        setIsLoading(true);
        try {
            const res = await authService.forgotPassword(trimmedEmail);
            setSuccessMessage(res.message || "Password reset code sent to your email");
        } catch (err) {
            if (isAxiosError(err)) {
                const data = err.response?.data;
                setError(data?.error || data?.message || "Failed to resend code.");
            } else {
                setError("Failed to resend code. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        step,
        setStep,
        email,
        setEmail,
        otp,
        setOtp,
        newPassword,
        setNewPassword,
        isLoading,
        error,
        successMessage,
        handleSendOtp,
        handleResetPassword,
        handleResendOtp,
    };
}
