"use client";

import { AnimatedCircularProgressBar } from "@/components/atoms/animated-circular-progress-bar";
import { Progress } from "@/components/ui/progress";
import {
    CircleCheckBig,
    Clock3,
    Stethoscope,
    Target,
    TrendingUp,
} from "lucide-react";

const OverviewSection = ({ overview }) => {
    const totalVisits = overview?.totalVisits ?? 0;
    const targetVisits = overview?.totalTarget ?? 0;
    const completion = overview?.completion ?? 0;

    const STATS = [
        {
            title: "Doctors",
            key: "totalDoctors",
            icon: Stethoscope,
            className:
                "bg-blue-50/40 border-blue-100/60 hover:shadow-blue-100/50",
            iconClass: "text-blue-600",
            textClass: "text-blue-900",
        },
        {
            title: "Target",
            key: "totalTarget",
            icon: Target,
            className:
                "bg-amber-50/40 border-amber-100/60 hover:shadow-amber-100/50",
            iconClass: "text-amber-600",
            textClass: "text-amber-900",
        },
        {
            title: "Completed",
            key: "totalVisits",
            icon: CircleCheckBig,
            className:
                "bg-emerald-50/40 border-emerald-100/60 hover:shadow-emerald-100/50",
            iconClass: "text-emerald-600",
            textClass: "text-emerald-900",
        },
        {
            title: "Pending",
            key: "pendingVisits",
            icon: Clock3,
            className:
                "bg-rose-50/40 border-rose-100/60 hover:shadow-rose-100/50",
            iconClass: "text-rose-600",
            textClass: "text-rose-900",
        },
        {
            title: "Extra",
            key: "extraVisits",
            icon: TrendingUp,
            className:
                "col-span-2 bg-purple-50/40 border-purple-100/60 hover:shadow-purple-100/50",
            iconClass: "text-purple-600",
            textClass: "text-purple-900",
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            <div className="col-span-3">
                <span className="text-base text-green-800 font-semibold tracking-tight">
                    Overview
                </span>
            </div>

            <div className="col-span-3 rounded-2xl border border-green-100/80 bg-linear-to-br from-green-50/40 to-emerald-50/20 p-6 w-full shadow-xs">
                <div className="flex items-center justify-between gap-6 flex-wrap sm:flex-nowrap">
                    <div className="flex-1 min-w-0">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-600/10 text-green-700">
                                <TrendingUp className="size-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-green-800">
                                    Monthly Progress
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-neutral-600 leading-relaxed">
                            You've completed{" "}
                            <span className="font-bold text-green-700">
                                {totalVisits}
                            </span>{" "}
                            out of{" "}
                            <span className="font-semibold text-neutral-800">
                                {targetVisits}
                            </span>{" "}
                            planned visits this month.
                        </p>

                        <div className="relative mt-6">
                            <Progress
                                value={completion}
                                className="h-2.5 bg-neutral-100 rounded-full"
                            />
                        </div>
                    </div>

                    <div className="shrink-0 mx-auto sm:mx-0">
                        <AnimatedCircularProgressBar
                            max={100}
                            min={0}
                            value={completion}
                            gaugePrimaryColor="var(--primary)"
                            gaugeSecondaryColor="var(--secondary)"
                        />
                    </div>
                </div>
            </div>

            {STATS.map((item) => (
                <div
                    key={item.key}
                    className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.className}`}
                >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        {item.title}
                    </p>
                    <div className="mt-4 flex items-end justify-between">
                        <h3
                            className={`text-2xl leading-none font-bold tracking-tight ${item.textClass}`}
                        >
                            {overview?.[item.key] ?? 0}
                        </h3>
                        {item.icon && (
                            <item.icon
                                className={`size-6 ${item.iconClass}`}
                                strokeWidth={2}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OverviewSection;
