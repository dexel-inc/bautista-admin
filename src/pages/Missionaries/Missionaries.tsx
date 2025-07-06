import PageMeta from "../../components/common/PageMeta.tsx";
import MissionariesTable from "../../components/tables/MissionariesTable.tsx";
import {PlusIcon} from "../../icons";
import {Link} from "react-router";

export default function Missionaries() {
  return (
    <>
      <PageMeta
        title="IBF - Misioneros"
        description="Familias que apoyan la iglesia bautista fundamental"
      />
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2
                className="text-xl font-semibold text-gray-800 dark:text-white/90"
                x-text="pageName"
            >
                Misioneros

                <nav className="font-normal">
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link
                                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                to="/"
                            >
                                Home
                                <svg
                                    className="stroke-current"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                                        stroke=""
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800 dark:text-white/90">
                            Misioneros
                        </li>
                    </ol>
                </nav>
            </h2>
            <div className="flex gap-4">
                <button
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                    <PlusIcon />
                    Nuevo
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500 bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 lg:inline-flex lg:w-auto">
                    Enviar PrayLetter
                </button>
            </div>
        </div>
        <div className="space-y-6">
          <MissionariesTable />
      </div>
    </>
  );
}
