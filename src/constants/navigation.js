import {
    ChartPieIcon,
    ClipboardIcon,
    HomeIcon,
    StethoscopeIcon,
} from "lucide-react";

export const NAV_ITMES = [
    {
        label: "Home",
        href: "/",
        icon: HomeIcon,
    },
    {
        label: "Doctors",
        href: "/doctors",
        icon: StethoscopeIcon,
    },
    {
        label: "Daily Logs",
        href: "/daily-logs",
        icon: ClipboardIcon,
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: ChartPieIcon,
    },
];
