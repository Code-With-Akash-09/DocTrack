"use client";

import { useEffect } from "react";

/**
 * Registers the service worker for PWA offline support.
 * Must be rendered inside a client component.
 */
const ServiceWorkerRegistrar = () => {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((reg) => {
                    console.log("[SW] Registered:", reg.scope);
                })
                .catch((err) => {
                    console.error("[SW] Registration failed:", err);
                });
        }
    }, []);

    return null;
};

export default ServiceWorkerRegistrar;
