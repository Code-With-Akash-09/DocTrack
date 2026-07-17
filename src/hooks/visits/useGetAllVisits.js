import { getVisitByUid } from "@/actions/visits";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetVisits = ({ uid, date, page = 1, limit = 10 }) => {
    return useInfiniteQuery({
        queryKey: ["visits", uid, date.toISOString().slice(0, 7), limit],
        enabled: !!uid,
        queryFn: async ({ pageParam = 1 }) => {
            const resp = await getVisitByUid(uid, {
                date,
                page: pageParam,
                limit,
            });

            if (resp.error) {
                throw new Error(resp.message);
            }

            return resp;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasNextPage
                ? lastPage.pagination.page + 1
                : undefined;
        },
        retry: 1,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export default useGetVisits;
