"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useDOCStore from "@/store";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const { user, loading } = useDOCStore();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth");
        }
    }, [loading, user, router]);

    if (loading) return null;

    if (!user) return null;

    return children;
}
