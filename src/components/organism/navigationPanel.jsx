"use client";

import { usePathname } from "next/navigation";
import { NAV_ITMES } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "../atoms/logo";
import { Button } from "../ui/button";

const NavigationPanel = ({ children }) => {
    const pathname = usePathname();

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col md:rounded-md">
            
            {/* Upper Action Tracking Header Shell */}
            <div className="flex w-full shrink-0 h-16 bg-gradient-to-b from-[#022c22] via-[#022c22] to-[#012b21] md:rounded-t-md px-4 py-2 shadow-sm">
                <div className="flex h-full items-center w-full gap-2">
                    <Logo height={40} width={40} />
                    <div className="flex flex-col text-white">
                        <span className="font-bold text-lg leading-none tracking-tight">
                            Doctor Visit
                        </span>
                        <span className="text-xs text-emerald-300/90 font-medium tracking-wide mt-0.5">
                            Tracker
                        </span>
                    </div>
                </div>
            </div>

            {/* Target App Main Screen Viewport */}
            <div className="min-h-0 flex-1 w-full bg-slate-50">
                {children}
            </div>

            {/* Bottom App Navigation Menu Dock Strip */}
            <div
                className={cn(
                    "grid w-full shrink-0 h-16 bg-white border-t border-slate-100 md:rounded-b-md px-4 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.03)] items-center",
                    NAV_ITMES.length === 1 && "grid-cols-1",
                    NAV_ITMES.length === 2 && "grid-cols-2",
                    NAV_ITMES.length === 3 && "grid-cols-3",
                    NAV_ITMES.length >= 4 && "grid-cols-4"
                )}
            >
                {NAV_ITMES.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Button
                            asChild
                            key={item.href}
                            variant="ghost"
                            className={cn(
                                "h-12 rounded-xl w-full transition-all duration-200 active:scale-95 flex items-center justify-center p-0",
                                isActive 
                                    ? "bg-emerald-50/60 text-emerald-800 dark:bg-emerald-950/20" 
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
                            )}
                        >
                            <Link
                                href={item.href}
                                className="flex flex-col items-center justify-center gap-1 w-full h-full"
                            >
                                <item.icon 
                                    className={cn(
                                        "size-5 transition-transform duration-200", 
                                        isActive 
                                            ? "stroke-[2.5] text-emerald-800 scale-105" 
                                            : "stroke-[2] text-slate-400"
                                    )} 
                                />
                                <span 
                                    className={cn(
                                        "text-[10px] tracking-widest uppercase transition-all duration-200",
                                        isActive ? "font-black text-emerald-800" : "font-bold text-slate-400"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        </Button>
                    );
                })}
            </div>

        </div>
    );
};

export default NavigationPanel;
//*************************************************************************** */
// "use client";

// import { usePathname } from "next/navigation";
// import { NAV_ITMES } from "@/constants/navigation";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import Logo from "../atoms/logo";
// import { Button } from "../ui/button";

// const NavigationPanel = ({ children }) => {
//     const pathname = usePathname();

//     return (
//         <div className="flex min-h-0 w-full flex-1 flex-col md:rounded-md">
            
//             {/* Upper Action Tracking Header Shell */}
//             <div className="flex w-full shrink-0 h-16 bg-gradient-to-r from-emerald-700 to-teal-800 md:rounded-t-md px-4 py-2 shadow-sm">
//                 <div className="flex h-full items-center w-full gap-2">
//                     <Logo height={40} width={40} />
//                     <div className="flex flex-col text-white">
//                         <span className="font-bold text-lg leading-none tracking-tight">
//                             Doctor Visit
//                         </span>
//                         <span className="text-xs text-emerald-300 font-medium tracking-wide mt-0.5">
//                             Tracker
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Target App Main Screen Viewport */}
//             <div className="min-h-0 flex-1 w-full bg-slate-50">
//                 {children}
//             </div>

//             {/* Bottom App Navigation Menu Dock Strip */}
//             <div
//                 className={cn(
//                     "grid w-full shrink-0 h-16 bg-white border-t border-slate-100 md:rounded-b-md px-4 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.03)] items-center",
//                     NAV_ITMES.length === 1 && "grid-cols-1",
//                     NAV_ITMES.length === 2 && "grid-cols-2",
//                     NAV_ITMES.length === 3 && "grid-cols-3",
//                     NAV_ITMES.length >= 4 && "grid-cols-4"
//                 )}
//             >
//                 {NAV_ITMES.map((item) => {
//                     // Check if current route matches target button paths
//                     const isActive = pathname === item.href;

//                     return (
//                         <Button
//                             asChild
//                             key={item.href}
//                             variant="ghost"
//                             className={cn(
//                                 "h-12 rounded-xl w-full transition-all duration-200 active:scale-95 flex items-center justify-center p-0",
//                                 isActive 
//                                     ? "bg-emerald-50/50 text-emerald-700 dark:bg-emerald-950/20" 
//                                     : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
//                             )}
//                         >
//                             <Link
//                                 href={item.href}
//                                 className="flex flex-col items-center justify-center gap-1 w-full h-full"
//                             >
//                                 <item.icon 
//                                     className={cn(
//                                         "size-5 transition-transform duration-200", 
//                                         isActive 
//                                             ? "stroke-[2.5] text-emerald-700 scale-105" 
//                                             : "stroke-[2] text-slate-400"
//                                     )} 
//                                 />
//                                 <span 
//                                     className={cn(
//                                         "text-[10px] tracking-wide uppercase transition-all duration-200",
//                                         isActive ? "font-black text-emerald-700" : "font-bold text-slate-400"
//                                     )}
//                                 >
//                                     {item.label}
//                                 </span>
//                             </Link>
//                         </Button>
//                     );
//                 })}
//             </div>

//         </div>
//     );
// };

// export default NavigationPanel;
//************************************************************************* */
// import { NAV_ITMES } from "@/constants/navigation";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import Logo from "../atoms/logo";
// import { Button } from "../ui/button";

// const NavigationPanel = ({ children }) => {
//     return (
//         <div className="flex min-h-0 w-full flex-1 flex-col md:rounded-md">
//             <div className="flex w-full shrink-0 h-16 bg-linear-to-r from-emerald-700 to-teal-800 md:rounded-t-md px-4 py-2">
//                 <div className="flex h-full items-center w-full gap-1">
//                     <Logo height={40} width={40} />
//                     <span className="flex flex-col w-fit text-white">
//                         <span className="font-bold text-lg leading-none">
//                             Doctor Visit
//                         </span>
//                         <span className="text-xs text-green-300"> Tracker</span>
//                     </span>
//                 </div>
//             </div>
//             <div className="min-h-0 flex-1 w-full bg-neutral-50">
//                 {children}
//             </div>
//             <div
//                 className={cn(
//                     "grid w-full shrink-0 h-16 bg-neutral-50 border-t border-neutral-200 md:rounded-b-md gap-4 px-4 py-2",
//                     NAV_ITMES.length > 4
//                         ? "grid-cols-4"
//                         : `grid-cols-${NAV_ITMES.length}`,
//                 )}
//             >
//                 {NAV_ITMES.map((item) => (
//                     <Button
//                         asChild
//                         key={item.href}
//                         variant="ghost"
//                         className="h-[unset]! rounded-md w-full"
//                     >
//                         <Link
//                             href={item.href}
//                             className="flex flex-col items-center justify-center gap-1 text-sm font-bold text-muted-foreground hover:text-green-700 transition-colors duration-200"
//                         >
//                             <item.icon className="size-5!" />
//                             <span className="text-[10px]">{item.label}</span>
//                         </Link>
//                     </Button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NavigationPanel;
