"use client";

import { login } from "@/actions/auth";
import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/db/firebase/client";
import useDOCStore from "@/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
    const { setUser, loading, setLoading } = useDOCStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                setLoading(true);
                if (!firebaseUser) {
                    setUser(null);
                    return;
                }
                const token = await firebaseUser.getIdToken();
                const user = await login(token);
                setUser(user);
            } catch (error) {
                console.error("Authentication Error:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 flex-1 w-full">
                <Spinner className="size-6 text-green-700" />
            </div>
        );
    }

    return children;
}
