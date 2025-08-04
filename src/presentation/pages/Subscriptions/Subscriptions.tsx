import PageMeta from "@/presentation/components/common/PageMeta.tsx";
import SubscriptionsTable from "@/presentation/components/tables/SubscriptionsTable.tsx";
import {PlusIcon} from "../../icons";
import PageBreadcrumb from "@/presentation/components/common/PageBreadCrumb.tsx";
import {Link} from "react-router";

export default function Subscriptions() {
    return (
    <>
      <PageMeta
          title="IBF - Suscripciones"
          description="AÑADIR DESCRIPCIÓN AQUÍ"
      />
        <PageBreadcrumb pageTitle="Suscripciones">
            <div className="flex flex-col lg:flex-row gap-4">
                <Link
                    to="/subscriptions/create"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                    <PlusIcon />
                    Nuevo
                </Link>
                <button className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500 bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 lg:inline-flex lg:w-auto">
                    Enviar notificación
                </button>
            </div>
        </PageBreadcrumb>
        <div className="space-y-6">
          <SubscriptionsTable />
        </div>
    </>
  );
}
