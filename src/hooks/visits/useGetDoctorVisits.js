"use client";

import { getDoctorVisitsByMonth } from "@/actions/visits";
import { useQuery } from "@tanstack/react-query";

const useGetDoctorVisits = ({ uid, doctorId, date }) => {
    return useQuery({
        queryKey: ["doctor-visits", uid, doctorId, date],
        queryFn: async () => {
            const resp = await getDoctorVisitsByMonth(
                uid,
                doctorId,
                date,
            );

            if (resp.error) {
                throw new Error(resp.message);
            }

            return resp;
        },
        enabled: !!uid && !!doctorId,
        retry: 1,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export default useGetDoctorVisits;
