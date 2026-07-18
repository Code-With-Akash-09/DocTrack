import Badge from "@/components/atoms/badge";
import { Button } from "@/components/ui/button";
import { SPECIALITY_ICONS } from "@/constants/doctor";
import { formatTimeRange } from "@/lib/utils";
import {
    AlarmClock,
    Calendar,
    ChevronRight,
    Stethoscope,
    User,
} from "lucide-react";
import Link from "next/link";
import VisitLogForm from "../visit/visitLogForm";

const DoctorCard = ({ card }) => {
    const Icon = SPECIALITY_ICONS[card.speciality[0]] ?? Stethoscope;
    const isTargetAchieved = card.monthlyVisits >= card.monthlyTarget;

    return (
        <div className="w-full max-w-full rounded-2xl border border-neutral-100 hover:border-green-200/85 bg-linear-to-br from-white to-neutral-50/30 p-4 space-y-3 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex w-full gap-3 items-center">
                <div className="flex items-center justify-center h-14 w-14 shrink-0 rounded-2xl bg-linear-to-br from-green-50 to-emerald-100/50 text-green-700 border border-green-100/30">
                    <Icon className="size-7 text-green-700 m-auto" />
                </div>
                <div className="flex flex-1 min-w-0 flex-col gap-1">
                    <Badge
                        variant="green"
                        className="w-fit text-[8px] font-bold uppercase tracking-wider px-2 py-0.5"
                    >
                        {card.speciality[0]}
                    </Badge>
                    <div className="flex flex-col min-w-0">
                        <h3
                            className="font-bold text-sm text-neutral-800 truncate"
                            title={card.name}
                        >
                            {card.name}
                        </h3>
                        <span
                            className="text-[10px] text-neutral-500 truncate"
                            title={card.hospital}
                        >
                            {card.hospital || "General Practice"}
                        </span>
                    </div>
                </div>
                <div
                    className={`flex w-16 shrink-0 flex-col items-center justify-center p-2.5 rounded-xl border ${
                        isTargetAchieved
                            ? "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                            : "bg-amber-50/30 border-amber-100/50 text-amber-800"
                    }`}
                >
                    <span className="text-xs font-bold leading-none">
                        {card.monthlyVisits} / {card.monthlyTarget}
                    </span>
                    <span
                        className={`text-[6px] font-extrabold uppercase mt-1 tracking-wider ${
                            isTargetAchieved
                                ? "text-emerald-700"
                                : "text-amber-700"
                        }`}
                    >
                        Visits Done
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 w-full bg-linear-to-br from-green-50/40 to-emerald-50/20 border border-green-100/50 gap-3 p-3 rounded-xl">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white/80 border border-green-100/50 shrink-0">
                        <Calendar className="size-4 text-green-600" />
                    </div>
                    <div className="flex flex-col text-[10px] font-bold text-neutral-800 min-w-0">
                        <span className="truncate">
                            {card.visitingDays
                                .map((day) => day.trim().substring(0, 3))
                                .join(", ")}
                        </span>
                        <span className="text-[9px] text-neutral-400 font-normal mt-0.5">
                            Visiting Days
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white/80 border border-green-100/50 shrink-0">
                        <AlarmClock className="size-4 text-green-600" />
                    </div>
                    <div className="flex flex-col text-[10px] font-bold text-neutral-800 min-w-0">
                        <span className="truncate">
                            {formatTimeRange(card.startTime, card.endTime)}
                        </span>
                        <span className="text-[9px] text-neutral-400 font-normal mt-0.5">
                            Visiting Time
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full pt-1">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-md! text-green-700 border-green-100 hover:bg-green-50/30 hover:border-green-200"
                    asChild
                >
                    <Link
                        href={`/doctors/${card.doctorId}`}
                        className="flex items-center justify-center gap-1.5 text-xs font-semibold"
                    >
                        <User className="size-3.5" />
                        Profile
                        <ChevronRight className="size-3.5" />
                    </Link>
                </Button>
                <VisitLogForm data={card} />
            </div>
        </div>
    );
};

export default DoctorCard;
