"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/db/firebase/client";
import useDOCStore from "@/store";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";

export default function LoginModal() {
    const { open, closeModal, callback } = useDOCStore();

    const login = async () => {
        await signInWithPopup(auth, googleProvider);
        closeModal();
        if (typeof callback === "function") {
            callback();
        }
    };

    return (
        <Dialog open={open} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader className="sr-only">
                    <DialogTitle>Continue with Google</DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 w-full">
                    <div className="flex  w-full justify-center items-center">
                        <span className="relative h-26 w-26 flex items-center justify-center rounded-lg overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Sonivra Logo"
                                width={100}
                                height={100}
                                loading="eager"
                                className="object-contain object-bottom"
                            />
                        </span>
                    </div>
                    <div className="gap-1 flex flex-col items-center justify-center text-center">
                        <span className="text-lg font-headingg font-bold tracking-wide">
                            Continue with Google
                        </span>
                        <p>Sign in to save your playlists and liked songs.</p>
                    </div>
                    <Button
                        variant=""
                        size="lg"
                        className="rounded-md! w-full gap-2"
                        onClick={login}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                        >
                            <title>Google</title>
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                            ></path>
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                            ></path>
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                        </svg>
                        Continue with Google
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
