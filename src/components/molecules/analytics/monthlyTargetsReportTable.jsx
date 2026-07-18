"use client";

import { format } from "date-fns";
import { BarChart3 } from "lucide-react";

const MonthlyTargetsReportTable = ({ targets, isLoading, selectedMonth }) => {
    return (
        <div className="w-full bg-white border border-neutral-100 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-green-50 text-green-700 shrink-0">
                        <BarChart3 className="size-5" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-neutral-800 text-sm truncate">
                            Monthly Targets Report
                        </h3>
                        <p className="text-[10px] text-neutral-400 truncate">
                            Doctor visit status breakdown
                        </p>
                    </div>
                </div>
                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                    {format(new Date(selectedMonth), "LLL yyyy")}
                </span>
            </div>

            <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            <th className="py-3 px-4 w-2/5">Doctor</th>
                            <th className="py-3 px-4 text-center w-1/6">
                                Target
                            </th>
                            <th className="py-3 px-4 text-center w-1/6">
                                Done
                            </th>
                            <th className="py-3 px-4 text-center w-1/6">
                                Pending
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                        {isLoading ? (
                            [...Array(3)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="-4">
                                        <div className="h-4 bg-neutral-100 rounded-sm w-3/4"></div>
                                    </td>
                                    <td className="-4">
                                        <div className="h-4 bg-neutral-100 rounded-sm w-6 mx-auto"></div>
                                    </td>
                                    <td className="-4">
                                        <div className="h-4 bg-neutral-100 rounded-sm w-6 mx-auto"></div>
                                    </td>
                                    <td className="-4">
                                        <div className="h-4 bg-neutral-100 rounded-sm w-6 mx-auto"></div>
                                    </td>
                                </tr>
                            ))
                        ) : !targets || targets.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-8 text-center text-xs text-neutral-400 font-medium"
                                >
                                    No active doctors or targets found for this
                                    month.
                                </td>
                            </tr>
                        ) : (
                            targets.map((row) => (
                                <tr
                                    key={row.doctorId}
                                    className="group hover:bg-neutral-50/40 transition-colors text-xs text-neutral-700"
                                >
                                    <td className="p-4 min-w-0">
                                        <div
                                            className="font-semibold text-neutral-800 group-hover:text-green-800 transition-colors truncate"
                                            title={row.name}
                                        >
                                            {row.name}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center font-medium">
                                        {row.monthlyTarget}
                                    </td>
                                    <td className="p-4 text-center font-semibold text-green-700">
                                        {row.done}
                                    </td>
                                    <td className="p-4 text-center font-semibold">
                                        <span
                                            className={
                                                row.pending > 0
                                                    ? "text-rose-500"
                                                    : "text-neutral-400"
                                            }
                                        >
                                            {row.pending}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MonthlyTargetsReportTable;
