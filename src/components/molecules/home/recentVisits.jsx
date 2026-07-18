"use client";

import VisitCard from "@/components/molecules/visit/visitCard";
import { History } from "lucide-react";

const RecentVisits = ({ recentVisits = [] }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div>
                <span className="text-base text-green-800 font-semibold tracking-tight">
                    Recent Visits
                </span>
            </div>
            <div className="flex w-full flex-col gap-3">
                {recentVisits.length > 0 ? (
                    recentVisits.map((visit) => (
                        <VisitCard key={visit.visitId} card={visit} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center w-full rounded-2xl px-4 py-8 gap-2 bg-neutral-50/50 border border-neutral-100">
                        <History className="size-8 text-neutral-300" />
                        <span className="text-xs text-neutral-400 font-medium">
                            No recent visits recorded.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentVisits;
