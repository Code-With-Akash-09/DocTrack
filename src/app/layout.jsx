import LoginModal from "@/components/molecules/loginModel";
import ServiceWorkerRegistrar from "@/components/atoms/serviceWorkerRegistrar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthProvider from "@/providers/authProvider";
import QueryClientProvider from "@/providers/queryClient";
import { ThemeProvider } from "@/providers/themeProvider";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Doctor Visit Tracker",
    description: "Track and manage your doctor visits with ease.",
    manifest: "/manifest.json",
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "DocTrack",
    },
    other: {
        "mobile-web-app-capable": "yes",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-inter h-dvh w-full antialiased overflow-hidden`}
            suppressHydrationWarning
        >
            <body className="flex h-full w-full bg-neutral-50 md:py-4 max-w-md mx-auto dark:bg-neutral-900 overflow-hidden">
                <QueryClientProvider>
                    <TooltipProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            disableTransitionOnChange
                            suppressHydrationWarning
                        >
                            <AuthProvider>
                                <main className="flex h-full w-full md:border md:border-neutral-200 md:rounded-md">
                                    {children}
                                </main>
                                <ServiceWorkerRegistrar />
                                <LoginModal />
                                <Toaster richColors />
                            </AuthProvider>
                        </ThemeProvider>
                    </TooltipProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
