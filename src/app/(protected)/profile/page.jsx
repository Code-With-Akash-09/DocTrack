"use client";

import ProfileSkeleton from "@/components/atoms/profileSkeleton";
import UserAvatar from "@/components/atoms/userAvatar";
import { Badge } from "@/components/ui/badge";
import { Google } from "@/constants/icons/google";
import useGetProfile from "@/hooks/auth/useGetProfile";
import useDOCStore from "@/store";
import { format } from "date-fns";
import { Calendar, Fingerprint, Mail, User, VerifiedIcon } from "lucide-react";

const ProfilePage = () => {
    const { user } = useDOCStore();
    const { data: profile, isLoading, isFetching } = useGetProfile(user?.uid);

    if (isLoading || isFetching) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="relative flex flex-col w-full">
            <div className="z-0 absolute top-0 h-94 border rounded-full w-full blur-[120px] bg-emerald-400/30 dark:bg-emerald-700/30" />
            <div className="relative h-60 overflow-hidden flex items-center justify-center w-full flex-col">
                <div className="z-0 absolute bottom-2/4 h-94 border border-neutral-50 bg-linear-to-r from-green-300/30 via-teal-300/30 to-blue-400/30  rounded-[20%] w-full backdrop-blur-sm" />
                <div className="z-0 absolute top-1/3 h-94 border border-neutral-100 bg-white/50 rounded-[40%] w-full backdrop-blur-sm" />
                <div className="z-20 flex flex-col items-center justify-end gap-4 h-full p-4 w-full">
                    <UserAvatar
                        src={profile?.image}
                        alt={profile?.name ?? "Profile avatar"}
                        size="h-24 w-24"
                        rounded="rounded-full"
                        className="border-4 border-neutral-50"
                    />
                    <div className="flex flex-col w-fit items-center text-center gap-2">
                        <span className="text-2xl font-semibold text-neutral-800">
                            {profile?.name}
                        </span>
                        <span className="text-xs text-neutral-600">
                            {profile?.email}
                        </span>
                        <Badge
                            variant="outline"
                            className={"h-[unset] px-2! py-1"}
                        >
                            <Google className="size-4!" />
                            <span className="text-xs text-neutral-600">
                                Google Account
                            </span>
                            <VerifiedIcon className="size-4! text-green-700" />
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="relative bg-white/50 backdrop-blur-sm rounded-b-md flex flex-1 gap-4 p-6 w-full flex-col">
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <User className="size-4!" /> Personal Information
                </span>
                <div className="flex flex-col gap-4">
                    {USER_SCHEMA.map((item) => {
                        const Icon = item.icon;
                        const value = item.formatter
                            ? item.formatter(profile?.[item.key])
                            : profile?.[item.key];

                        return (
                            <div
                                key={item.key}
                                className="flex items-center justify-start gap-4"
                            >
                                <div className="flex aspect-square w-10 items-center justify-center rounded-lg bg-white">
                                    <Icon className="size-5 text-green-600" />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs font-semibold text-neutral-800">
                                        {item.name}
                                    </span>
                                    <span className="text-[11px] text-neutral-600">
                                        {value}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

const USER_SCHEMA = [
    {
        name: "UID",
        key: "uid",
        icon: Fingerprint,
    },
    {
        name: "Full Name",
        key: "name",
        icon: User,
    },
    {
        name: "Email Address",
        key: "email",
        icon: Mail,
    },
    {
        name: "Provider",
        key: "provider",
        icon: Google,
    },
    {
        name: "Join Date",
        key: "createdAt",
        icon: Calendar,
        formatter: (value) => {
            if (!value) return "N/A";
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return "N/A";
            return format(date, "PPp");
        },
    },
];
