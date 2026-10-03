"use client";

import React, { useEffect, useState } from "react";
import { ShieldIcon, UserIcon, BellIcon } from "@/lib/icons";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { notificationService } from "@/lib/services/notification.service";

/**
 * Shared top navigation header used across all dashboard pages.
 * Shows VEDA brand, notification badge with real unread count, and user avatar.
 */
export default function DashHeader() {
    const { profile } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        notificationService
            .getUnreadCount()
            .then(({ unread_count }) => setUnreadCount(unread_count))
            .catch(() => setUnreadCount(0));
    }, []);

    return (
        <header className="h-[73px] bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
                <ShieldIcon className="w-6 h-6 text-[#1a172c]" />
                <span className="font-extrabold text-xl text-[#1a172c] tracking-wide">VEDA</span>
            </div>

            <div className="flex items-center gap-3">
                {/* Notification Bell */}
                <Link href="/notifications" className="relative">
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                        <BellIcon className="w-5 h-5" />
                    </div>
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </Link>

                {/* User Avatar */}
                <Link href="/profile">
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors overflow-hidden">
                        {profile?.avatar_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={profile.avatar_url}
                                alt={profile.full_name || "Avatar"}
                                className="w-full h-full object-cover"
                            />
                        ) : profile?.full_name ? (
                            <span className="text-sm font-bold text-[#5a4fcf]">
                                {profile.full_name.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <UserIcon className="w-5 h-5" />
                        )}
                    </div>
                </Link>
            </div>
        </header>
    );
}
