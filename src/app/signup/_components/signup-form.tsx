"use client";

import React, { useState } from "react";
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "@/lib/icons";
import { useSignup } from "../_hooks/use-signup";

export function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        success,
        handleSubmit,
    } = useSignup();

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Error Banner */}
            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Success Banner */}
            {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-lg">
                    Account created successfully! Redirecting to login…
                </div>
            )}

            {/* Full Name */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="signup-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                    placeholder="Full Name"
                    autoComplete="name"
                />
            </div>

            {/* Email */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="signup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                    placeholder="Email"
                    autoComplete="email"
                />
            </div>

            {/* Password */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors"
                    placeholder="Password (min. 8 chars, 1 uppercase, 1 number)"
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

            <div className="pt-4">
                <button
                    id="signup-submit"
                    type="submit"
                    disabled={isLoading || success}
                    className="w-full bg-[#1e1b3a] text-white py-4 rounded-lg font-bold text-sm hover:bg-[#2d2952] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                    {isLoading ? "Creating account…" : "Register"}
                </button>
            </div>
        </form>
    );
}
