import { clsx } from "clsx";
import { format, parse } from "date-fns";
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

export const formatTimeRange = (startTime, endTime) => {
    const start = parse(startTime, "HH:mm", new Date());
    const end = parse(endTime, "HH:mm", new Date());

    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
};
