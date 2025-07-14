import { useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import {Link, useNavigate, useParams} from 'react-router';
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import { useMissionary } from "@/hooks/useMissionary.ts";

export default function MissionaryDetail() {
    const {missionaryId} = useParams();
    const { missionary, loading } = useMissionary(parseInt(missionaryId ?? ''));
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !missionary) {
            navigate("not-found");
        }
    }, [missionary, loading, navigate]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!loading && !missionary) {
        return null;
    }

    return (
        <>
            <PageMeta title={`IBF - ${missionary?.family}`} description="Missionary detail"/>
            <PageBreadcrumb pageTitle={missionary?.family} others={
                <li className="text-sm self-center">
                    <Link
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                        to="/missionaries"
                    >
                        Misioneros
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
            }>
                <Link to={`/missionaries/${missionary?.id}/edit`}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                    <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                            fill=""
                        />
                    </svg>
                    Editar
                </Link>
            </PageBreadcrumb>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 flex flex-col lg:flex-row gap-6">
                <div className="w-full">
                    <img className="h-80 w-full lg:w-auto" src={missionary?.img ?? ''} title={missionary?.family ?? ''} alt={missionary?.family ?? ''}/>
                </div>
                <div className="w-full">
                    <div className="pb-6 w-full">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Descripción
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {missionary?.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="w-full">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 justify-between w-full">
                                <div className="w-full">
                                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                        Nombre de contacto
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        {missionary?.user?.name}
                                    </p>
                                </div>
                                <div className="w-full">
                                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                        Correo electrónico
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        {missionary?.user?.email}
                                    </p>
                                </div>
                                <div className="w-full">
                                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                        Ubicación
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        {missionary?.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}