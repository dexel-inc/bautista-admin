import StatisticsChart from "@/presentation/components/statistics/StatisticsChart.tsx";
import PageMeta from "@/presentation/components/common/PageMeta.tsx";
import visitsService from "@/domain/services/Visits.service.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@/domain/hooks/useAuth.ts";
import {getUser} from "@/domain/storage/user.ts";
import {Empty} from "@/presentation/icons";

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
                <div className="mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                ¡Bienvenid@ {user?.user?.name ? `, ${user.user.name}` : ""}!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Esta es tu consola administrativa. Aquí podrás ver estadísticas y gestionar el aplicativo.
                            </p>
                        </div>
                    </div>
                </div>
                {stats?.monthly?.length ? (
                    <StatisticsChart data={stats.monthly} />
                ) : (
                    <div className="flex p-4 flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <Empty className="w-50 h-50 text-brand-500 mb-4" />
                        <div>
                            <h2 className="text-center dark:text-white text-base font-semibold leading-relaxed pb-1"> Ups! Aún hay estadisticas </h2>
                            <p className="text-center dark:text-white text-sm font-normal leading-snug pb-4"> No hay estadísticas disponibles por el momento...</p>
                        </div>
                    </div>
                )}
            </div>
      </div>
    </>
  );
}
