"use client";

import React from "react";
import Link from "next/link";
import { MailIcon, LockIcon, ShieldIcon, EyeIcon, EyeOffIcon, CheckIcon } from "@/lib/icons";
import { useResetPassword } from "../_hooks/use-reset-password";

export function ResetPasswordForm() {
    const {
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
    } = useResetPassword();

    return (
        <div className="space-y-6">
            {/* Error Banner */}
            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Password Updated Success Banner */}
            {successMessage && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-lg flex items-center gap-2.5">
                    <CheckIcon className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Resend OTP Success Banner */}
            {resendSuccessMessage && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm px-4 py-3 rounded-lg flex items-center gap-2.5">
                    <CheckIcon className="h-5 w-5 text-blue-600 shrink-0" />
                    <span>{resendSuccessMessage}</span>
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email Address */}
                <div>
                    <label htmlFor="reset-email" className="block text-xs font-semibold text-gray-700 mb-1">
                        Account Email
                    </label>
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
                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>
                </div>

                {/* OTP / Verification Code */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label htmlFor="reset-otp" className="block text-xs font-semibold text-gray-700">
                            Verification Code (OTP)
                        </label>
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isResending || !email.trim()}
                            className="text-xs text-[#5a4fcf] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isResending ? "Sending code…" : "Resend code"}
                        </button>
                    </div>
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
                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors font-mono tracking-wider"
                            placeholder="Enter 6-digit code from email"
                        />
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label htmlFor="new-password" className="block text-xs font-semibold text-gray-700 mb-1">
                        New Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <LockIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                            placeholder="Min. 8 chars, 1 uppercase, 1 number"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Confirm New Password */}
                <div>
                    <label htmlFor="confirm-password" className="block text-xs font-semibold text-gray-700 mb-1">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <LockIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                            placeholder="Re-enter your new password"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        id="reset-submit-button"
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#1e1b3a] text-white py-3.5 rounded-lg font-bold text-sm hover:bg-[#2d2952] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                    >
                        {isLoading ? "Updating password…" : "Reset Password"}
                    </button>
                </div>
            </form>

            {/* Additional Links */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-600">
                <Link href="/forgot-password" className="hover:text-[#1a172c] hover:underline">
                    Need a new code?
                </Link>
                <Link href="/login" className="hover:text-[#1a172c] font-semibold hover:underline">
                    ← Back to Login
                </Link>
            </div>
        </div>
    );
}
