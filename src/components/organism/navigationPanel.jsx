import { NAV_ITMES } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "../atoms/logo";
import { Button } from "../ui/button";

const NavigationPanel = ({ children }) => {
    return (
        <div className="flex min-h-0 w-full flex-1 flex-col md:rounded-md">
            <div className="flex w-full shrink-0 h-16 bg-linear-to-r from-emerald-700 to-teal-800 md:rounded-t-md px-4 py-2">
                <div className="flex h-full items-center w-full gap-1">
                    <Logo height={40} width={40} className={"size-10"} />
                    <span className="flex flex-col w-fit text-white">
                        <span className="font-bold text-lg leading-none">
                            Doctor Visit
                        </span>
                        <span className="text-xs text-green-300"> Tracker</span>
                    </span>
                </div>
            </div>
            <div className="min-h-0 flex-1 w-full bg-neutral-50 dark:bg-neutral-900 overflow-y-auto">
                {children}
            </div>
            <div
                className={cn(
                    "grid w-full shrink-0 h-16 bg-neutral-50 border-t border-neutral-200 md:rounded-b-md gap-4 px-4 py-2",
                    NAV_ITMES.length > 4
                        ? "grid-cols-4"
                        : `grid-cols-${NAV_ITMES.length}`,
                )}
            >
                {NAV_ITMES.map((item) => (
                    <Button
                        asChild
                        key={item.href}
                        variant="ghost"
                        className="h-[unset]! rounded-md w-full"
                    >
                        <Link
                            href={item.href}
                            className="flex flex-col items-center justify-center gap-1 text-sm font-bold text-muted-foreground hover:text-green-700 transition-colors duration-200"
                        >
                            <item.icon className="size-5!" />
                            <span className="text-[10px]">{item.label}</span>
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default NavigationPanel;
