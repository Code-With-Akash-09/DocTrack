"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function MonthPicker({
    value,
    onChange,
    startYear = 2020,
    endYear = new Date().getFullYear() + 5,
}) {
    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i,
    );

    const handleMonthChange = (month) => {
        const newDate = new Date(value);
        newDate.setMonth(Number(month));
        onChange(newDate);
    };

    const handleYearChange = (year) => {
        const newDate = new Date(value);
        newDate.setFullYear(Number(year));
        onChange(newDate);
    };

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-full justify-start rounded-md"
                    />
                }
            >
                <CalendarDays className="mr-2 size-4" />
                {format(value, "MMMM yyyy")}
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="max-w-md! grid grid-cols-2 rounded-md gap-2"
            >
                <div className="w-full">
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                        Month
                    </p>
                    <Select
                        value={String(value.getMonth())}
                        onValueChange={handleMonthChange}
                        className="w-full rounded-md"
                    >
                        <SelectTrigger className="rounded-md w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                            align="bottom"
                            className="rounded-md w-full! min-h-24! max-h-32!"
                        >
                            {MONTHS.map((month, index) => (
                                <SelectItem key={month} value={String(index)}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                        Year
                    </p>
                    <Select
                        value={String(value.getFullYear())}
                        onValueChange={handleYearChange}
                        className="rounded-md w-full"
                    >
                        <SelectTrigger className="rounded-md w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                            align="bottom"
                            className="rounded-md w-full! min-h-24! max-h-32!"
                        >
                            {years.map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    );
}
