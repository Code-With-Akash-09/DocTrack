"use client";

import { login } from "@/actions/db/auth";
import { auth } from "@/db/firebase/client";
import useSonivraStore from "@/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
    const { setUser, setLoading } = useSonivraStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                const user = await login(token);
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return children;
}
