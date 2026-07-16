"use client";

import DoctorCard from "@/components/molecules/doctors/doctorCard";
import DoctorForm from "@/components/molecules/doctors/doctorForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import useGetDoctors from "@/hooks/doctors/useGetDoctors";
import useDOCStore from "@/store";
import { Search, StethoscopeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";

const page = () => {
    const { user: { uid } = null } = useDOCStore();
    const { ref, inView } = useInView();
    const [search, setSearch] = useState("");

    const [debouncedSearch] = useDebounce(search, 500);
    const query = debouncedSearch.trim();

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useGetDoctors({
        uid,
        search: query,
    });

    const doctors = data?.pages?.flatMap((page) => page.data) || [];
    const pagination = data?.pages?.[data.pages.length - 1]?.pagination || {};

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

    return (
        <div className="flex h-full flex-col min-h-0 gap-4 w-full flex-1 overflow-hidden p-4">
            <div className="flex items-center justify-between w-full shrink-0">
                <div className="h-fit">
                    <h2 className="leading-none font-semibold">
                        <span className="text-green-700">Doctors</span>{" "}
                        Directory
                    </h2>
                    <span className="text-xs text-neutral-600">
                        Total : {!isLoading ? pagination?.total || 0 : 0}
                    </span>
                </div>
                <DoctorForm />
            </div>
            <div className="flex w-full shrink-0">
                <Label className="flex items-center w-full gap-2">
                    <Search className="absolute ml-3.5 size-5! text-neutral-400" />
                    <Input
                        type={"text"}
                        className="w-full rounded-md pl-12! h-12!"
                        placeholder="Search doctors..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Label>
            </div>
            <div className="min-h-0 flex-1 w-full overflow-y-auto overflow-x-hidden hide-scrollbar">
                {isLoading && isFetching ? (
                    <div className="w-full border border-neutral-200 rounded-md flex h-full min-h-0 flex-1 items-center justify-center">
                        <Spinner className="size-6 text-green-700" />
                    </div>
                ) : doctors.length === 0 ? (
                    <div className="w-full border border-neutral-200 rounded-md flex flex-col items-center justify-center h-full min-h-0 flex-1">
                        <StethoscopeIcon className="size-20! text-neutral-400" />
                        <span className="text-neutral-400 font-medium mt-4">
                            No doctors found in your list
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col w-full gap-4">
                        {doctors.map((doctor) => (
                            <DoctorCard key={doctor._id} card={doctor} />
                        ))}
                        {doctors && doctors.length > 0 && (
                            <div ref={ref} className="h-10" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
