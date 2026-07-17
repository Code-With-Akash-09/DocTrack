"use client";

import React from "react";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";

// Importing your custom UI components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Expanded sample dataset matching your system anatomy exactly
const doctorsData = [
  {
    id: 1,
    name: "Dr. Abraham Lincoln",
    specialty: "CARDIOLOGY",
    subTitle: "General Heart Care",
    visitsDone: 2,
    totalVisits: 3,
    days: "Mon, Wed & Fri",
    time: "10:00 AM - 1:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
    badgeStyles:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  },
  {
    id: 2,
    name: "Dr. Beatrice Vance",
    specialty: "PEDIATRICS",
    subTitle: "Children First Medical Center",
    visitsDone: 0,
    totalVisits: 1,
    days: "Tuesday & Thursday",
    time: "2:00 PM - 5:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=256&q=80",
    badgeStyles:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  },
  {
    id: 3,
    name: "Dr. William Smith",
    specialty: "DERMATOLOGY",
    subTitle: "Skin & Hair Specialist",
    visitsDone: 1,
    totalVisits: 2,
    days: "Mon, Tue & Sat",
    time: "11:00 AM - 2:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&q=80",
    badgeStyles:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
  },
  {
    id: 4,
    name: "Dr. Sophia Martinez",
    specialty: "NEUROLOGY",
    subTitle: "Brain & Spine Clinic",
    visitsDone: 3,
    totalVisits: 5,
    days: "Wednesday & Friday",
    time: "09:00 AM - 12:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80",
    badgeStyles:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  },
  {
    id: 5,
    name: "Dr. James Carter",
    specialty: "ORTHOPEDICS",
    subTitle: "Joint & Bone Care",
    visitsDone: 1,
    totalVisits: 4,
    days: "Monday & Thursday",
    time: "3:00 PM - 6:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&w=256&q=80",
    badgeStyles:
      "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400",
  },
  {
    id: 6,
    name: "Dr. Elena Rostova",
    specialty: "OPHTHALMOLOGY",
    subTitle: "Vision & Advanced Eye Care",
    visitsDone: 2,
    totalVisits: 2,
    days: "Tuesday & Friday",
    time: "10:30 AM - 1:30 PM",
    avatar:
      "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=256&q=80",
    badgeStyles:
      "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-400",
  },
  {
    id: 7,
    name: "Dr. Rajesh Koothrapali",
    specialty: "PSYCHIATRY",
    subTitle: "Mind & Behavioral Health",
    visitsDone: 0,
    totalVisits: 3,
    days: "Mon, Wed & Thu",
    time: "4:00 PM - 7:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=256&q=80",
    badgeStyles:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400",
  },
  {
    id: 8,
    name: "Dr. Emily Watson",
    specialty: "GYNECOLOGY",
    subTitle: "Women's Wellness Group",
    visitsDone: 4,
    totalVisits: 4,
    days: "Tuesday & Saturday",
    time: "08:00 AM - 11:00 AM",
    avatar:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=256&q=80",
    badgeStyles:
      "bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400",
  },
];

const Page = () => {
  return (
    // Fills parent layout slot area seamlessly without clipping borders
    <div className="h-full w-full flex flex-col overflow-hidden bg-neutral-50">
      {/* Deep Emerald / Teal Directory Banner Header */}
      <div className="bg-gradient-to-b from-[#022c22] via-[#044e36] to-[#0f766e] pt-6 pb-12 px-6 rounded-b-[2rem] relative shadow-md mb-5 z-20 shrink-0">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.4),transparent)] pointer-events-none" />

        <div className="flex justify-between items-center mb-4 relative z-10">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Doctors Directory
            </h1>
            <p className="text-xs text-emerald-200/80 font-medium mt-0.5">
              {doctorsData.length} doctors found
            </p>
          </div>

          <Button
            variant="outline"
            className="bg-white hover:bg-slate-50 text-[#044e36] font-semibold border-none rounded-xl h-8 px-3 shadow-sm text-xs gap-1 transition-all"
          >
            <Plus className="size-3.5 stroke-[3]" />
            Add Doctor
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4 relative z-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, specialty, notes..."
              className="pl-9 pr-4 h-10 w-full bg-white text-slate-800 placeholder:text-slate-400 rounded-xl border-none shadow-inner focus-visible:ring-2 focus-visible:ring-emerald-500 text-xs"
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-slate-50 text-slate-700 h-10 w-10 rounded-xl border-none shadow-sm shrink-0"
          >
            <Filter className="size-4 stroke-[2]" />
          </Button>
        </div>
      </div>

      {/* Dynamic Scrollable Content Container Window */}
      <div className="px-4 -mt-5 pt-5 pb-6 flex flex-col gap-4 relative z-10 flex-1 overflow-y-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {doctorsData.map((doctor, index) => (
          <Card
            key={`${doctor.id}-${index}`}
            className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden p-4 group/card hover:shadow-md transition-all shrink-0"
          >
            <CardContent className="p-0 flex flex-col gap-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="relative shrink-0 w-14 h-14">
                    <Image
                      src={doctor.avatar}
                      alt={doctor.name}
                      width={56}
                      height={56}
                      unoptimized
                      className="rounded-full object-cover ring-4 ring-slate-100 w-14 h-14"
                    />
                    <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                  </div>

                  <div className="flex flex-col items-start pt-0.5">
                    <Badge
                      className={`border-none px-2 py-0.5 text-[9px] font-bold tracking-wider rounded-md mb-1 ${doctor.badgeStyles}`}
                    >
                      {doctor.specialty}
                    </Badge>
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight leading-snug">
                      {doctor.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {doctor.subTitle}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 min-w-[55px] pt-1">
                  <span className="text-sm font-black text-slate-800 tracking-tight">
                    {doctor.visitsDone} / {doctor.totalVisits}
                  </span>
                  <p className="text-[8px] font-black tracking-widest text-slate-400 uppercase mt-0.5">
                    Visits Done
                  </p>
                </div>
              </div>

              <div className="bg-[#f0f6fa] rounded-xl px-3 py-1.5 flex items-center justify-between gap-2 text-slate-600 text-[11px] font-semibold">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-blue-500/80 stroke-[2]" />
                  <span>{doctor.days}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-blue-500/80 stroke-[2]" />
                  <span>{doctor.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <button className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-0.5 transition-colors focus:outline-none">
                  View Profile & History
                  <ChevronRight className="size-3.5 stroke-[2.5]" />
                </button>

                <Button className="bg-[#046a4e] hover:bg-[#03523c] text-white text-xs font-semibold px-3 h-7.5 rounded-full gap-1 shadow-sm transition-all">
                  <Plus className="size-3 stroke-[3]" />
                  Log Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
//********************************************************************************* */
// "use client";

// import React from "react";
// import {
//   Search,
//   Filter,
//   Plus,
//   Calendar,
//   Clock,
//   ChevronRight,
//   Home,
//   Stethoscope,
//   ClipboardList,
//   PieChart
// } from "lucide-react";

// // Importing your custom components
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";

// // Sample data extracted exactly from the provided image
// const doctorsData = [
//   {
//     id: 1,
//     name: "Dr. Abraham Lincoln",
//     specialty: "CARDIOLOGY",
//     subTitle: "General Heart Care",
//     visitsDone: 2,
//     totalVisits: 3,
//     days: "Mon, Wed & Fri",
//     time: "10:00 AM - 1:00 PM",
//     avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
//     badgeStyles: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
//   },
//   {
//     id: 2,
//     name: "Dr. Beatrice Vance",
//     specialty: "PEDIATRICS",
//     subTitle: "Children First Medical Center",
//     visitsDone: 0,
//     totalVisits: 1,
//     days: "Tuesday & Thursday",
//     time: "2:00 PM - 5:00 PM",
//     avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=256&q=80",
//     badgeStyles: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
//   },
//   {
//     id: 3,
//     name: "Dr. William Smith",
//     specialty: "DERMATOLOGY",
//     subTitle: "Skin & Hair Specialist",
//     visitsDone: 1,
//     totalVisits: 2,
//     days: "Mon, Tue & Sat",
//     time: "11:00 AM - 2:00 PM",
//     avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&q=80",
//     badgeStyles: "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
//   },
//   {
//     id: 4,
//     name: "Dr. Abraham Lincoln",
//     specialty: "CARDIOLOGY",
//     subTitle: "General Heart Care",
//     visitsDone: 2,
//     totalVisits: 3,
//     days: "Mon, Wed & Fri",
//     time: "10:00 AM - 1:00 PM",
//     avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
//     badgeStyles: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
//   },
// ];

// const Page = () => {
//   return (
//     <div className=" bg-slate-50 flex justify-center items-start p-0 sm:p-4 text-slate-900 selection:bg-emerald-200">
//       {/* Changed fixed bounds to allow container control over scrolling viewports */}
//       <div className="w-full max-w-md bg-[#f8fafc] h-screen sm:h-[550px] shadow-2xl overflow-hidden relative flex flex-col sm:rounded-5xl border border-slate-100">

//         {/* Deep Emerald / Teal Wave Gradient Header - Fixed z-index for scrolling cards beneath */}
//         <div className="bg-gradient-to-b from-[#022c22] via-[#044e36] to-[#0f766e] pt-8 pb-14 px-6 rounded-b-[2.5rem] relative shadow-lg z-30 shrink-0">
//           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.4),transparent)] pointer-events-none" />

//           <div className="flex justify-between items-center mb-4 relative z-10">
//             <div>
//               <h1 className="text-2xl font-bold text-white tracking-tight">Doctors Directory</h1>
//               <p className="text-xs text-emerald-200/80 font-medium mt-0.5">3 of 3 doctors found</p>
//             </div>

//             <Button
//               variant="outline"
//               className="bg-white hover:bg-slate-50 text-[#044e36] font-semibold border-none rounded-2xl h-9 px-3.5 shadow-sm text-xs gap-1 transition-all"
//             >
//               <Plus className="size-3.5 stroke-[3]" />
//               Add Doctor
//             </Button>
//           </div>

//           <div className="flex items-center gap-2 mt-6 relative z-10">
//             <div className="relative flex-1">
//               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
//               <Input
//                 type="text"
//                 placeholder="Search by name, specialty, notes..."
//                 className="pl-10 pr-4 h-11 w-full bg-white text-slate-800 placeholder:text-slate-400 rounded-2xl border-none shadow-inner focus-visible:ring-2 focus-visible:ring-emerald-500 text-sm"
//               />
//             </div>

//             <Button
//               variant="outline"
//               size="icon"
//               className="bg-white hover:bg-slate-50 text-slate-700 h-11 w-11 rounded-2xl border-none shadow-sm shrink-0"
//             >
//               <Filter className="size-4 stroke-[2]" />
//             </Button>
//           </div>
//         </div>

//         {/* Scrollable Container Window Area */}
//         {/* overflow-y-auto enables smooth scrolling, while pt-8 accounts for the overlapping header strip */}
//         <div className="px-4 -mt-6 pt-8 pb-28 flex flex-col gap-4 relative z-10 flex-1 overflow-y-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//           {doctorsData.map((doctor, index) => (
//             <Card key={`${doctor.id}-${index}`} className="bg-white border-0 shadow-sm rounded-3xl overflow-hidden p-4 group/card hover:shadow-md transition-all shrink-0">
//               <CardContent className="p-0 flex flex-col gap-3.5">

//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex gap-3">
//                     <div className="relative shrink-0 w-16 h-16">
//                       {/* Fixed: Assigned explicit width and height properties to avoid layout shifts */}
//                       <Image
//                         src={doctor.avatar}
//                         alt={doctor.name}
//                         width={64}
//                         unoptimized
//                         height={64}
//                         className="rounded-full object-cover ring-4 ring-slate-100 w-16 h-16"
//                       />
//                       <span className="absolute bottom-0 right-0 size-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
//                     </div>

//                     <div className="flex flex-col items-start pt-0.5">
//                       <Badge className={`border-none px-2 py-0.5 text-[9px] font-bold tracking-wider rounded-md mb-1 ${doctor.badgeStyles}`}>
//                         {doctor.specialty}
//                       </Badge>
//                       <h3 className="font-bold text-slate-900 text-base tracking-tight leading-snug">
//                         {doctor.name}
//                       </h3>
//                       <p className="text-xs text-slate-400 font-medium">
//                         {doctor.subTitle}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="text-right shrink-0 min-w-[60px] pt-1">
//                     <span className="text-base font-black text-slate-800 tracking-tight">
//                       {doctor.visitsDone} / {doctor.totalVisits}
//                     </span>
//                     <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase mt-0.5">
//                       Visits Done
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-[#f0f6fa] rounded-xl px-3 py-2 flex items-center justify-between gap-2 text-slate-600 text-xs font-semibold">
//                   <div className="flex items-center gap-1.5">
//                     <Calendar className="size-3.5 text-blue-500/80 stroke-[2]" />
//                     <span>{doctor.days}</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <Clock className="size-3.5 text-blue-500/80 stroke-[2]" />
//                     <span>{doctor.time}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-1">
//                   <button className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-0.5 transition-colors focus:outline-none">
//                     View Profile & History
//                     <ChevronRight className="size-4 stroke-[2.5]" />
//                   </button>

//                   <Button
//                     className="bg-[#046a4e] hover:bg-[#03523c] text-white text-xs font-semibold px-4 h-8 rounded-full gap-1 shadow-sm transition-all"
//                   >
//                     <Plus className="size-3 stroke-[3]" />
//                     Log Visit
//                   </Button>
//                 </div>

//               </CardContent>
//             </Card>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Page;
