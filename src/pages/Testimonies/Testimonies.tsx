import PageMeta from "../../components/common/PageMeta.tsx";
import {PlusIcon} from "../../icons";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import {Link} from "react-router";
import TestimoniesTable from "@/components/tables/TestimoniesTable.tsx";

export default function Testimonies() {
    return (
    <>
      <PageMeta
        title="IBF - Testimonios"
        description="Personas y familias que comparten su experiencia"
      />
        <PageBreadcrumb pageTitle="Testimonios">
            <div className="flex flex-col lg:flex-row gap-4">
                <Link
                    to="/testimonies/create"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                    <PlusIcon />
                    Nuevo
                </Link>
            </div>
        </PageBreadcrumb>
        <div className="space-y-6">
          <TestimoniesTable />
        </div>
    </>
  );
}
