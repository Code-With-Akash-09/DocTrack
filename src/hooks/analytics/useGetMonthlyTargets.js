import { getMonthlyTargetsReport } from "@/actions/analytics";
import { useQuery } from "@tanstack/react-query";

const useGetMonthlyTargets = ({ uid, date }) => {
    return useQuery({
        queryKey: ["monthly-targets", uid, date ? date.toISOString().slice(0, 7) : ""],
        enabled: !!uid && !!date,
        queryFn: async () => {
            const resp = await getMonthlyTargetsReport(uid, date);
            if (resp.error) {
                throw new Error(resp.message);
            }
            return resp.data;
        },
    });
};

export default useGetMonthlyTargets;
