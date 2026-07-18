"use client";

import { getDashboard } from "@/actions/home";
import { useQuery } from "@tanstack/react-query";

const useGetDashboard = ({ uid, date }) => {
    return useQuery({
        queryKey: ["dashboard", uid, date.toISOString().slice(0, 7)],
        queryFn: async () => {
            const resp = await getDashboard(uid, {
                date,
            });

            if (resp.error) {
                throw new Error(resp.error);
            }

            return resp.data;
        },
        enabled: !!uid,
        staleTime: 1000 * 60 * 5,
    });
};

export default useGetDashboard;
