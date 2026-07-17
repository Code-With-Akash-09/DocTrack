"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const BackButton = () => {
    const router = useRouter();
    return (
        <Button
            variant="outline"
            size="icon-lg"
            className="rounded-md! cursor-pointer"
            onClick={() => router.back()}
        >
            <ArrowLeft className="size-4!" />
        </Button>
    );
};

export default BackButton;
