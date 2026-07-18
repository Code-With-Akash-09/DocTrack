"use client";

import { NAV_ITMES } from "@/constants/navigation";
import usePWAInstall from "@/hooks/usePWAInstall";
import { cn } from "@/lib/utils";
import useDOCStore from "@/store";
import { Download, Share, X } from "lucide-react";
import Link from "next/link";
import Logo from "../atoms/logo";
import UserAvatar from "../atoms/userAvatar";
import { Button } from "../ui/button";

// ─── iOS Install Banner ───────────────────────────────────────────────────────
const IOSInstallBanner = ({ isIOSSafari, onDismiss }) => (
    <div className="relative z-50 w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3 flex items-start gap-3 shadow-lg animate-in slide-in-from-top duration-300">
        {/* App icon */}
        <div className="shrink-0 mt-0.5">
            <img
                src="/logo.png"
                alt="DocTrack"
                className="size-10 rounded-xl border-2 border-white/30 shadow-sm"
            />
        </div>

        {/* Instructions */}
        <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-snug">Install Doctor Visit Tracker</p>
            {isIOSSafari ? (
                <p className="text-xs text-white/85 mt-0.5 leading-snug">
                    Tap{" "}
                    <span className="inline-flex items-center gap-0.5 font-semibold bg-white/20 rounded px-1 py-0.5">
                        <Share className="size-3" />
                        Share
                    </span>{" "}
                    then <span className="font-semibold">&ldquo;Add to Home Screen&rdquo;</span>
                </p>
            ) : (
                <p className="text-xs text-white/85 mt-0.5 leading-snug">
                    Open this page in{" "}
                    <span className="font-semibold">Safari</span> to install the app
                    on your iPhone
                </p>
            )}
        </div>

        {/* Dismiss */}
        <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss install banner"
            className="shrink-0 mt-0.5 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
            <X className="size-4" />
        </button>
    </div>
);

// ─── NavigationPanel ──────────────────────────────────────────────────────────
const NavigationPanel = ({ children }) => {
    const { user } = useDOCStore();
    const {
        isInstallable,
        install,
        isIOS,
        isIOSSafari,
        showIOSBanner,
        dismissIOSBanner,
    } = usePWAInstall();

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col md:rounded-md">
            {/* ── iOS install banner (sits above the header) ── */}
            {isIOS && showIOSBanner && (
                <IOSInstallBanner
                    isIOSSafari={isIOSSafari}
                    onDismiss={dismissIOSBanner}
                />
            )}

            {/* ── Header ── */}
            <div className="flex relative w-full shrink-0 h-16 md:rounded-t-md overflow-hidden">
                <div className="flex w-full h-full absolute z-0 bg-linear-to-r from-green-300/30 via-teal-300/30 to-blue-400/30 backdrop-blur-sm" />
                <div className="z-10 flex h-full items-center justify-between w-full px-4 py-2 backdrop-blur-sm">
                    {/* Logo + title */}
                    <div className="flex w-fit h-full items-center space-x-2">
                        <Logo height={40} width={40} className={"size-10"} />
                        <span className="flex flex-col w-fit text-white">
                            <span className="font-bold text-lg leading-none text-neutral-800">
                                Doctor{" "}
                                <span className="text-green-800">Visit</span>
                            </span>
                            <span className="text-xs text-neutral-600">
                                Tracker
                            </span>
                        </span>
                    </div>

                    {/* Right side: install button + avatar */}
                    <div className="flex w-fit h-full items-center gap-2">
                        {/* Android / Desktop Chrome — native install prompt */}
                        {isInstallable && (
                            <button
                                type="button"
                                onClick={install}
                                title="Install App"
                                className="relative flex items-center gap-1.5 rounded-full bg-green-600 hover:bg-green-700 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
                            >
                                <span className="absolute -inset-0.5 rounded-full animate-ping bg-green-400/40 pointer-events-none" />
                                <Download className="size-3.5 shrink-0" />
                                <span>Install</span>
                            </button>
                        )}

                        {/* iOS — re-show the banner if user dismissed it */}
                        {isIOS && !showIOSBanner && (
                            <button
                                type="button"
                                onClick={() => {
                                    // re-open banner on demand
                                    sessionStorage.removeItem("pwa-ios-banner-dismissed");
                                    window.location.reload();
                                }}
                                title="Install App"
                                className="relative flex items-center gap-1.5 rounded-full bg-green-600 hover:bg-green-700 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
                            >
                                <span className="absolute -inset-0.5 rounded-full animate-ping bg-green-400/40 pointer-events-none" />
                                <Download className="size-3.5 shrink-0" />
                                <span>Install</span>
                            </button>
                        )}

                        {/* User avatar */}
                        <Link
                            href="/profile"
                            className="flex h-full items-center"
                        >
                            <UserAvatar
                                src={user?.image}
                                alt={user?.name ?? "User avatar"}
                                size="h-10 w-10"
                                rounded="rounded-full border-2 border-neutral-50 hover:border-green-700 transition-colors duration-200"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="min-h-0 flex-1 w-full bg-neutral-50 dark:bg-neutral-900 overflow-y-auto hide-scrollbar">
                {children}
            </div>

            {/* ── Bottom nav ── */}
            <div
                className={cn(
                    "grid z-10 w-full shrink-0 bg-neutral-50 border-t border-neutral-200 h-16 md:rounded-b-md gap-4 px-4 py-2",
                    NAV_ITMES.length > 4
                        ? "grid-cols-4"
                        : `grid-cols-${NAV_ITMES.length}`,
                )}
            >
                {NAV_ITMES.map((item) => (
                    <Button
                        asChild
                        key={item.href}
                        variant="ghost"
                        className="h-[unset]! rounded-md w-full"
                    >
                        <Link
                            href={item.href}
                            className="flex flex-col items-center justify-center gap-1 font-bold text-muted-foreground hover:text-green-700! transition-colors duration-200"
                        >
                            <item.icon className="size-4!" />
                            <span className="text-[10px]">{item.label}</span>
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default NavigationPanel;
