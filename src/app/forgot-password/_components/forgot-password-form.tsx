"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MailIcon, LockIcon, ShieldIcon, EyeIcon, EyeOffIcon, CheckIcon } from "@/lib/icons";
import { useForgotPassword } from "../_hooks/use-forgot-password";

export function ForgotPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const {
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
    } = useForgotPassword();

    return (
        <div className="space-y-6">
            {/* Error Banner */}
            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Success Banner */}
            {successMessage && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-lg flex items-center gap-2.5">
                    <CheckIcon className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            {step === "send_otp" ? (
                /* Step 1: Send OTP to Email */
                <form className="space-y-4" onSubmit={handleSendOtp}>
                    <p className="text-sm text-gray-500 mb-2">
                        Enter your account email address and we&apos;ll send you a password reset code.
                    </p>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MailIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="forgot-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            id="forgot-submit"
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1e1b3a] text-white py-4 rounded-lg font-bold text-sm hover:bg-[#2d2952] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isLoading ? "Sending code…" : "Send Reset Code"}
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => setStep("verify_reset")}
                            className="text-xs text-gray-500 hover:text-[#1a172c] underline"
                        >
                            Already have a reset code?
                        </button>
                    </div>
                </form>
            ) : (
                /* Step 2: Verify OTP & Set New Password */
                <form className="space-y-4" onSubmit={handleResetPassword}>
                    <p className="text-sm text-gray-500 mb-2">
                        Enter the verification code sent to <strong className="text-gray-700">{email || "your email"}</strong> and your new password.
                    </p>

                    {/* Email (read-only / editable if needed) */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MailIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="reset-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-50"
                            placeholder="Account Email"
                            autoComplete="email"
                        />
                    </div>

                    {/* OTP Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <ShieldIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="reset-otp"
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors tracking-widest font-mono"
                            placeholder="Enter 6-digit code"
                            maxLength={8}
                        />
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <LockIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="reset-password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                            placeholder="New Password (min 8 chars, 1 uppercase, 1 num)"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <div className="pt-2">
                        <button
                            id="reset-submit"
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1e1b3a] text-white py-4 rounded-lg font-bold text-sm hover:bg-[#2d2952] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isLoading ? "Updating password…" : "Reset Password"}
                        </button>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isLoading}
                            className="text-[#5a4fcf] font-semibold hover:underline disabled:opacity-50"
                        >
                            Resend code
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep("send_otp")}
                            className="text-gray-500 hover:underline"
                        >
                            Change email
                        </button>
                    </div>
                </form>
            )}

            {/* Back to Login Link */}
            <div className="text-center pt-2 border-t border-gray-100">
                <Link href="/login" className="text-sm text-gray-600 hover:text-[#1a172c] font-medium">
                    ← Back to Login
                </Link>
            </div>
        </div>
    );
}
