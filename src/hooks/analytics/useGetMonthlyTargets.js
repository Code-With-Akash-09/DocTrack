import { getMonthlyTargetsReport } from "@/actions/analytics";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetMonthlyTargets = ({ uid, date, limit = 15 }) => {
    return useInfiniteQuery({
        queryKey: [
            "monthly-targets",
            uid,
            date ? date.toISOString().slice(0, 7) : "",
        ],
        enabled: !!uid && !!date,
        queryFn: async ({ pageParam = 1 }) => {
            const resp = await getMonthlyTargetsReport(uid, date, {
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
            if (!lastPage.pagination?.hasNextPage) return undefined;
            return lastPage.pagination.page + 1;
        },
    });
};

export default useGetMonthlyTargets;
