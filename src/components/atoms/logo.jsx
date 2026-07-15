import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({ className, height, width }) => {
    return (
        <span className={cn("relative aspect-square", className)}>
            <Image
                src={"/logo.png"}
                alt="Doctor Visit Tracker"
                height={height || 100}
                width={width || 100}
                loading="eager"
                className="object-contain object-center h-full w-full"
            />
        </span>
    );
};

export default Logo;
