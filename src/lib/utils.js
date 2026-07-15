import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getType = (val) =>
    Object.prototype.toString.call(val).slice(8, -1);

export function getGoogleProfileImage(url, size = 512) {
    if (!url) return "";

    return url.replace(/=s\d+-c$/, `=s${size}-c`);
}
