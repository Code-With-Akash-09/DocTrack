"use client";

import { useEffect, useState } from "react";

/**
 * usePWAInstall
 *
 * Handles PWA install across all platforms:
 *  - Android / Desktop Chrome  → beforeinstallprompt native prompt
 *  - iOS Safari                → show "Add to Home Screen" instructions
 *  - iOS Chrome/Firefox        → show "Open in Safari" guidance
 */
const usePWAInstall = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false); // native prompt available
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isIOSSafari, setIsIOSSafari] = useState(false);
    const [showIOSBanner, setShowIOSBanner] = useState(false);

    useEffect(() => {
        // ── Already running as installed PWA ──────────────────────────────────
        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true; // iOS Safari standalone

        if (standalone) {
            setIsInstalled(true);
            return;
        }

        // ── Detect iOS ────────────────────────────────────────────────────────
        const ua = navigator.userAgent;
        const ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        // Safari on iOS: has "Safari" in UA but not "CriOS" (Chrome) or "FxiOS" (Firefox)
        const iosSafari =
            ios && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);

        setIsIOS(ios);
        setIsIOSSafari(iosSafari);

        if (ios) {
            // Show iOS install banner — respect a "dismissed" flag in sessionStorage
            const dismissed = sessionStorage.getItem("pwa-ios-banner-dismissed");
            if (!dismissed) {
                setShowIOSBanner(true);
            }
            return;
        }

        // ── Android / Desktop — native install prompt ─────────────────────────
        const handleBeforeInstall = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsInstallable(false);
            setDeferredPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstall);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    // Trigger native prompt (Android / Desktop)
    const install = async () => {
        if (!deferredPrompt) return false;
        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setIsInstalled(true);
                setIsInstallable(false);
            }
            setDeferredPrompt(null);
            return true;
        } catch (err) {
            console.error("Error triggering install prompt:", err);
            return false;
        }
    };

    // Dismiss iOS banner and remember it for the session
    const dismissIOSBanner = () => {
        setShowIOSBanner(false);
        sessionStorage.setItem("pwa-ios-banner-dismissed", "1");
    };

    return {
        // Android/Desktop
        isInstallable,
        install,
        // iOS
        isIOS,
        isIOSSafari,
        showIOSBanner,
        dismissIOSBanner,
        // common
        isInstalled,
    };
};

export default usePWAInstall;
