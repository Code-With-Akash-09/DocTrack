import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <div className="relative flex w-full flex-col">
            <div className="absolute top-0 z-0 h-94 w-full rounded-full bg-emerald-400/20 blur-[120px]" />
            <div className="relative flex h-60 w-full flex-col items-center justify-center overflow-hidden">
                <div className="absolute bottom-2/4 z-0 h-94 w-full rounded-[20%] border border-neutral-100 bg-white/20 backdrop-blur-sm" />
                <div className="absolute top-1/3 z-0 h-94 w-full rounded-[40%] border border-neutral-100 bg-white/40 backdrop-blur-sm" />
                <div className="relative z-20 flex h-full w-full flex-col items-center justify-end gap-4 p-4">
                    <Skeleton className="h-24 w-24 rounded-full border-4 border-white" />
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-7 w-44 rounded-md" />
                        <Skeleton className="h-4 w-60 rounded-md" />
                        <Skeleton className="mt-1 h-8 w-36 rounded-full" />
                    </div>
                </div>
            </div>
            <div className="relative flex flex-1 flex-col gap-6 rounded-b-md bg-white/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-md" />
                    <Skeleton className="h-5 w-40 rounded-md" />
                </div>
                <div className="flex flex-col gap-5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-3 w-24 rounded-md" />
                                <Skeleton className="h-4 w-52 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
