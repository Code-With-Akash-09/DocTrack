import Badge from "@/components/atoms/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SPECIALITY_ICONS } from "@/constants/doctor";
import { formatTimeRange } from "@/lib/utils";
import {
    AlarmClock,
    Calendar,
    ChevronRight,
    Plus,
    Stethoscope,
    User,
} from "lucide-react";
import Link from "next/link";

const DoctorCard = ({ card }) => {
    const Icon = SPECIALITY_ICONS[card.speciality[0]] ?? Stethoscope;

    return (
        <div className="w-full max-w-full rounded-lg shadow border border-neutral-100 bg-white p-4 space-y-4">
            <div className="flex w-full gap-4">
                <div className="flex items-center justify-center h-16 w-16 shrink-0 rounded-full bg-green-50 ring ring-green-600/20 ">
                    <Icon className="size-8! text-green-600 m-auto" />
                </div>
                <div className="flex flex-1 shrink-0 flex-col gap-2">
                    <Badge
                        variant="green"
                        className="w-fit text-[8px] uppercase"
                    >
                        {card.speciality[0]}
                    </Badge>
                    <div className="flex flex-col">
                        <h3 className="font-medium leading-none text-sm">
                            {card.name}
                        </h3>
                        <span className="text-[10px] text-neutral-600">
                            {card.hospital}
                        </span>
                    </div>
                </div>
                <div className="flex w-14 shrink-0 flex-col items-center justify-center gap-0.5">
                    <span className="">2 / 3</span>
                    <span className="text-[8px] font-medium text-green-600 uppercase">
                        Visit Done
                    </span>
                </div>
            </div>
            <div className="flex flex-row w-full bg-green-50 ring-green-600/20 gap-4 p-4 rounded-md">
                <div className="flex items-center gap-2">
                    <Calendar className="size-6! text-green-600" />
                    <div className="flex flex-col text-xs font-semibold text-neutral-800">
                        <span>
                            {card.visitingDays
                                .map((day) => day.trim().substring(0, 3))
                                .join(", ")}
                        </span>
                        <span className="text-[10px] text-neutral-600 font-normal">
                            Visiting Days
                        </span>
                    </div>
                </div>
                <Separator orientation="vertical" />
                <div className="flex items-center gap-2">
                    <AlarmClock className="size-6! text-green-600" />
                    <div className="flex flex-col text-xs font-semibold text-neutral-800">
                        <span>
                            {formatTimeRange(card.startTime, card.endTime)}
                        </span>
                        <span className="text-[10px] text-neutral-600 font-normal">
                            Visiting Time
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-md! text-green-700"
                    asChild
                >
                    <Link
                        href={`/doctors/${card.doctorId}`}
                        className="flex items-center gap-2"
                    >
                        <User className="size-4!" />
                        View Profile
                        <ChevronRight className="size-4!" />
                    </Link>
                </Button>
                <Button
                    variant="default"
                    size="lg"
                    className="rounded-md! gap-2 cursor-pointer bg-linear-to-b from-green-600 to-green-800 text-white w-full"
                >
                    <Plus className="size-4!" />
                    Log Visit
                </Button>
            </div>
        </div>
    );
};

export default DoctorCard;
