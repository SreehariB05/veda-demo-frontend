"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/auth.service";
import { isAxiosError } from "axios";

/**
 * Hook for signup form.
 * Sends POST /api/auth/signup with { email, password, full_name }.
 */
export function useSignup() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        if (!hasUppercase || !hasNumber) {
            setError("Password must contain at least one uppercase letter and one number.");
            return;
        }

        setIsLoading(true);
        try {
            await authService.signup({ email, password, full_name: fullName });
            setSuccess(true);
            setTimeout(() => router.push("/login"), 1500);
        } catch (err) {
            if (isAxiosError(err)) {
                const data = err.response?.data;
                // Handle Zod validation error details
                if (data?.details) {
                    const firstError = Object.values(data.details as Record<string, string[]>)[0]?.[0];
                    setError(firstError || data.error || "Registration failed.");
                } else {
                    setError(data?.error || data?.message || "Registration failed. Please try again.");
                }
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fullName, setFullName,
        email, setEmail,
        password, setPassword,
        isLoading,
        error,
        success,
        handleSubmit,
    };
}
