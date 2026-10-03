"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthRedirectHandler() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const hash = window.location.hash;
        const search = window.location.search;

        // Check if the user arrived from a Supabase recovery/reset password email
        const isRecoveryHash = hash.includes("type=recovery");
        const isRecoverySearch = search.includes("type=recovery");

        if (isRecoveryHash || isRecoverySearch) {
            router.replace(`/reset-password${search}${hash}`);
        }
    }, [router]);

    return null;
}
