import { cn } from "@/lib/utils";

const StatCard = ({ title, value, icon: Icon, className }) => {
    return (
        <div
            className={cn(
                "rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                className,
            )}
        >
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {title}
            </p>
            <div className="mt-5 flex items-end justify-between">
                <h3 className="text-2xl leading-none font-bold tracking-tight text-neutral-900">
                    {value ?? 0}
                </h3>
                {Icon && (
                    <Icon className="size-6! text-green-800" strokeWidth={2} />
                )}
            </div>
        </div>
    );
};

export default StatCard;
