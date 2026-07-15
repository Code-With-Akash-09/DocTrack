"use client";

import Logo from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/db/firebase/client";
import useDOCStore from "@/store";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthPage = () => {
    const { closeModal, callback } = useDOCStore();
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
        <div className="flex flex-col h-full w-full py-6">
            <div className="gap-6 flex flex-col items-center justify-center flex-1 w-full">
                <div className="w-fit mx-auto">
                    <Logo />
                </div>
                <div className="space-y-2">
                    <h1 className="w-fit mx-auto space-x-4 font-inter text-center">
                        <div className="space-x-2 text-3xl font-extrabold">
                            <span className="text-neutral-700">Doctor</span>
                            <span className="text-green-700">Visit</span>
                        </div>
                        <span className="text-base font-semibold text-neutral-700">
                            Tracker
                        </span>
                    </h1>
                    <p className="text-sm max-w-xs text-center text-neutral-600">
                        Securely manage your doctor appointments, prescriptions,
                        medical records, and health reminders-all in one place.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="w-fit rounded-md! px-6 mx-auto gap-2"
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
                    Sign In with Google
                </Button>
            </div>
        </div>
    );
};

export default AuthPage;
