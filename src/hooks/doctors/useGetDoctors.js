"use client";

import { getDoctors } from "@/actions/doctors";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDoctors = ({ uid, search = "" }) => {
    return useInfiniteQuery({
        queryKey: ["getDoctors", uid, search],
        enabled: !!uid,
        queryFn: async ({ pageParam = 1 }) => {
            const resp = await getDoctors(uid, {
                page: pageParam,
                limit: 10,
                search,
            });

            if (resp.error) {
                throw new Error(resp.message);
            }

            return resp;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.pagination.hasNextPage) {
                return undefined;
            }
            return lastPage.pagination.page + 1;
        },
        retry: 1,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export default useGetDoctors;
