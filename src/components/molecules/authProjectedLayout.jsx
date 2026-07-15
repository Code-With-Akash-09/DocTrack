"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useDOCStore from "@/store";

export default function AuthProtectedLayout({ children }) {
    const router = useRouter();
    const { user, loading } = useDOCStore();

    useEffect(() => {
        if (!loading && user) {
            router.replace("/");
        }
    }, [loading, user, router]);

    if (loading) return null;

    return children;
}
