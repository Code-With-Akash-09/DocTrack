"use client";

import { NAV_ITMES } from "@/constants/navigation";
import usePWAInstall from "@/hooks/usePWAInstall";
import { cn } from "@/lib/utils";
import useDOCStore from "@/store";
import { Download, Share, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../atoms/logo";
import UserAvatar from "../atoms/userAvatar";
import { toast } from "sonner";
import { Button } from "../ui/button";

const NavigationPanel = ({ children }) => {
    const { user } = useDOCStore();
    const {
        isInstallable,
        install,
        isInstalled,
    } = usePWAInstall();

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col md:rounded-md relative">
            <div className="flex relative w-full shrink-0 h-16 md:rounded-t-md overflow-hidden">
                <div className="flex w-full h-full absolute z-0 bg-linear-to-r from-green-300/30 via-teal-300/30 to-blue-400/30 backdrop-blur-sm" />
                <div className="z-10 flex h-full items-center justify-between w-full px-4 py-2 backdrop-blur-sm">
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

                    <div className="flex w-fit h-full items-center gap-2">
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

            <div className="min-h-0 flex-1 w-full bg-white dark:bg-neutral-900 overflow-y-auto hide-scrollbar">
                {children}
            </div>

            <div
                className={cn(
                    "grid z-10 w-full shrink-0 bg-white border-t border-neutral-200 h-16 md:rounded-b-md gap-4 px-4 py-2",
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

            {!isInstalled && (
                <button
                    type="button"
                    onClick={async () => {
                        const success = await install();
                        if (!success) {
                            toast.info(
                                "Tap your browser's menu (Share / Menu) and select 'Add to Home Screen' or 'Install' to install directly.",
                            );
                        }
                    }}
                    title="Install App"
                    className="absolute bottom-20 right-4 z-50 flex items-center justify-center size-12 rounded-full bg-green-600 hover:bg-green-700 active:scale-95 text-white shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 hover:shadow-xl cursor-pointer"
                >
                    <span className="absolute -inset-1 rounded-full animate-ping bg-green-400/45 pointer-events-none" />
                    <Download className="size-6 shrink-0" />
                </button>
            )}
        </div>
    );
};

export default NavigationPanel;
