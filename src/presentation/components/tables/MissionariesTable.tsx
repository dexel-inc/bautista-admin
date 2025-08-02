import { useMissionaries } from "@/domain/hooks/useMissionary.ts";
import { PlusIcon } from "@/presentation/icons";
import MissionaryCard from "@/presentation/components/form/MissionaryCard.tsx";
import { Missionary } from "@/domain/models/Missionary.ts";
import {Link} from "react-router";

export default function MissionariesTable() {
    const { missionaries, loading, updateMissionary } = useMissionaries();

    const toggleMissionary = async (missionary: Missionary, isActive: boolean) => {
        await updateMissionary(missionary, { isEnabled: isActive });
    }

    if (loading) return <p>Cargando misioneros...</p>;

    return (
        <>
            {missionaries.length ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {missionaries.map((missionary) => (
                        <MissionaryCard toggleMissionary={toggleMissionary} missionary={missionary} key={missionary.id} />
                    ))}
                </div>
            ) : (
                <div className="w-full h-full my-20 flex items-center flex-wrap justify-center gap-10">
                    <div className="grid gap-4 w-60">
                        <svg className="mx-auto text-brand-500" xmlns="http://www.w3.org/2000/svg" width="116" height="121" viewBox="0 0 116 121" fill="none">
                            <path d="M0.206909 63.57C0.206909 31.7659 25.987 6.12817 57.6487 6.12817C89.2631 6.12817 115.079 31.7541 115.079 63.57C115.079 77.0648 110.43 89.4805 102.627 99.2755C91.8719 112.853 75.4363 121 57.6487 121C39.7426 121 23.4018 112.794 12.6582 99.2755C4.85538 89.4805 0.206909 77.0648 0.206909 63.57Z" fill="currentColor" className="text-brand-500/50"/>
                            <path d="M72.7942 0.600875L72.7942 0.600762L72.7836 0.599331C72.3256 0.537722 71.8622 0.5 71.3948 0.5H22.1643C17.1256 0.5 13.0403 4.56385 13.0403 9.58544V107.286C13.0403 112.308 17.1256 116.372 22.1643 116.372H93.1214C98.1725 116.372 102.245 112.308 102.245 107.286V29.4482C102.245 28.7591 102.17 28.0815 102.019 27.4162L102.019 27.416C101.615 25.6459 100.67 24.0014 99.2941 22.7574C99.2939 22.7572 99.2937 22.757 99.2934 22.7568L77.5462 2.89705C77.5461 2.89692 77.5459 2.89679 77.5458 2.89665C76.2103 1.66765 74.5591 0.876968 72.7942 0.600875Z" fill="white" stroke="currentColor" />
                            <circle cx="60.2069" cy="61" r="21.0256" fill="currentColor" className="text-brand-500/20"/>
                            <path d="M74.6786 46.1412L74.6783 46.1409C66.5737 38.0485 53.4531 38.0481 45.36 46.1412C37.2552 54.2341 37.2551 67.3666 45.3597 75.4596C53.4529 83.5649 66.5739 83.5645 74.6786 75.4599C82.7716 67.3669 82.7716 54.2342 74.6786 46.1412ZM79.4694 41.3508C90.2101 52.0918 90.2101 69.5093 79.4694 80.2502C68.7166 90.9914 51.3104 90.9915 40.5576 80.2504C29.8166 69.5095 29.8166 52.0916 40.5576 41.3506C51.3104 30.6096 68.7166 30.6097 79.4694 41.3508Z" stroke="currentColor"/>
                        </svg>
                        <div>
                            <h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1"> Ups! Aún hay misioneros </h2>
                            <p className="text-center text-black text-sm font-normal leading-snug pb-4">Esto no es un problema, puedes hacerlo ahora.</p>
                            <div className="flex gap-3 justify-center">
                                <Link
                                    to="/missionaries/create"
                                    className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500 bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 lg:inline-flex lg:w-auto"
                                >
                                    <PlusIcon/>
                                    Registrar Misionero
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
