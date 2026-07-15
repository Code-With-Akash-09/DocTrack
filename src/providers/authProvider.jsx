"use client";

import { login } from "@/actions/auth";
import { auth } from "@/db/firebase/client";
import useDOCStore from "@/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
    const { setUser, setLoading } = useDOCStore();

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
