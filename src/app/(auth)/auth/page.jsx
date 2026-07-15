"use client";

import Logo from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";
import { Google } from "@/constants/icons/google";
import { auth, googleProvider } from "@/db/firebase/client";
import useDOCStore from "@/store";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthPage = () => {
    const { closeModal, loading, callback } = useDOCStore();
    const router = useRouter();

    const login = async () => {
        const { user = null } = await signInWithPopup(auth, googleProvider);
        if (user) router.push("/");
        closeModal();

        if (typeof callback === "function") {
            callback();
        }
    };

    return (
        <div className="flex relative flex-col h-full w-full py-6 overflow-y-auto hide-scrollbar">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-emerald-400/20 blur-[120px]" />
                <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />
                <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-300/20 blur-[160px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4d4d414_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d414_1px,transparent_1px)] bg-size-[42px_42px]" />
            </div>
            <div className="relative z-10  gap-6 flex flex-col backdrop-blur-sm items-center justify-center flex-1 w-full">
                <div className="w-full max-w-40 mx-auto">
                    <Logo />
                </div>
                <div className="flex flex-col w-full gap-4 items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-black tracking-tight">
                            <span className="text-neutral-800">Doctor</span>{" "}
                            <span className="text-emerald-600">Visit</span>
                        </h1>
                        <p className="text-lg font-semibold text-neutral-700">
                            Tracker
                        </p>
                    </div>
                    <p className="mx-auto max-w-sm text-center leading-7 text-neutral-600">
                        Track doctor visits, prescriptions, medicines and health
                        records from one secure place.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="rounded-xl space-y-2 border bg-white/70 px-4 py-2 text-center shadow-sm">
                            <div className="text-xl">🔐</div>
                            <p className="text-xs font-semibold">Secure</p>
                        </div>
                        <div className="rounded-xl space-y-2 border bg-white/70 px-4 py-2 text-center shadow-sm">
                            <div className="text-xl">☁️</div>
                            <p className="text-xs font-semibold">Cloud Sync</p>
                        </div>
                        <div className="rounded-xl space-y-2 border bg-white/70 px-4 py-2 text-center shadow-sm">
                            <div className="text-xl">💚</div>
                            <p className="text-xs font-semibold">Free</p>
                        </div>
                    </div>
                    <Button
                        size="lg"
                        disabled={loading}
                        onClick={login}
                        className="w-fit rounded-md! px-6 mx-auto gap-2"
                    >
                        <Google className="size-5!" />
                        {loading ? "Signing in..." : "Continue with Google"}
                    </Button>
                    <p className="mt-8 text-center text-xs leading-6 text-neutral-500">
                        🔒 Your medical records remain private and are securely
                        encrypted.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
