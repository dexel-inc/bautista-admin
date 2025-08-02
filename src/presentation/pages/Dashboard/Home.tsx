import StatisticsChart from "@/presentation/components/statistics/StatisticsChart.tsx";
import PageMeta from "@/presentation/components/common/PageMeta.tsx";
import visitsService from "@/domain/services/Visits.service.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@/domain/hooks/useAuth.ts";
import {getUser} from "@/domain/storage/user.ts";

export default function Home() {
    const [stats, setStats] = useState({ monthly: []});
    const { isLoading } = useAuth();
    const user = getUser();

    useEffect(() => {
        if(!isLoading && user && !stats?.monthly?.length) {
            visitsService.stats().then(res => setStats(res));
        }
    }, [isLoading]);

    return (
    <>
      <PageMeta
          title="Iglesia Bautista fundamental"
          description="Consola administrativa"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-5">
        <div className="col-span-12">
            {
                stats?.monthly?.length
                    ? <StatisticsChart data={stats.monthly} />
                    : ''
            }
        </div>
      </div>
    </>
  );
}
