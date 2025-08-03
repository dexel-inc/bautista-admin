import PageMeta from "@/presentation/components/common/PageMeta.tsx";
import {Empty, PlusIcon, TrashBinIcon} from "../../icons";
import PageBreadcrumb from "@/presentation/components/common/PageBreadCrumb.tsx";
import {useTestimoniesContext} from "@/presentation/context/TestimoniesContext.tsx";
import Button from "@/presentation/components/ui/button/Button.tsx";
import {useCallback, useState} from "react";
import {Testimony} from "@/domain/models/Testimony.ts";
import {useModal} from "@/domain/hooks/useModal.ts";
import TestimonyCard from "@/presentation/components/form/TestimonyCard.tsx";
import TestimonyForm from "@/presentation/components/form/TestimonyForm.tsx";
import {Modal} from "@/presentation/components/ui/modal";

export default function Testimonies() {
    const [isOpenFormModal, setIsOpenFormModal] = useState(false);
    const { testimonies, deleteTestimony } = useTestimoniesContext();
    const { isOpen, closeModal, openModal } = useModal();
    const [selectedTestimony, setSelectedTestimony] = useState<null|Testimony>(null);
    const openFormModal = useCallback(() => setIsOpenFormModal(true), []);
    const closeFormModal = useCallback(() => setIsOpenFormModal(false), []);

    const markOpenForm = (testimony: Testimony|null) => {
        openFormModal();
        setSelectedTestimony(testimony);
    }

    const markCloseForm = () => {
        closeFormModal();
        setSelectedTestimony(null);
    }

    const markOpen = (testimony: Testimony) => {
        openModal();
        setSelectedTestimony(testimony);
    }

    const deleteSelectedTestimony = () => {
        if(selectedTestimony) {
            deleteTestimony(selectedTestimony.id)
        }

        setSelectedTestimony(null);
        closeModal();
    }

    return (
    <>
      <PageMeta
        title="IBF - Testimonios"
        description="Personas y familias que comparten su experiencia"
      />
        <PageBreadcrumb pageTitle="Testimonios">
            <div className="flex flex-col lg:flex-row gap-4">
                <Button
                    variant="primary"
                    onClick={() => markOpenForm(null)}
                >
                    <PlusIcon />
                    Nuevo
                </Button>
            </div>
        </PageBreadcrumb>
        
        <div className="space-y-6 h-full">
                {
                    testimonies.length
                        ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                { testimonies.map((testimony: Testimony) => (
                                    <TestimonyCard openModalForm={markOpenForm} openModal={markOpen} testimony={testimony} key={testimony.id} />
                                )) }
                            </div>
                        ) : <div className="w-full h-full my-20 flex items-center flex-wrap justify-center gap-10">
                            <div className="grid gap-4 w-60">
                                <Empty className="w-[116px] h-[121px] mx-auto text-brand-500" />
                                <div>
                                    <h2 className="text-center text-gray-800 dark:text-white text-base font-semibold leading-relaxed pb-1"> Ups! Aún hay testimonios </h2>
                                    <p className="text-center text-gray-800 dark:text-white text-sm font-normal leading-snug pb-4">Esto no es un problema, puedes hacerlo ahora.</p>
                                    <div className="flex gap-3 justify-center">
                                        <Button
                                            variant="primary"
                                            onClick={() => markOpenForm(null)}
                                            className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500 bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 lg:inline-flex lg:w-auto"
                                        >
                                            <PlusIcon/>
                                            Crear testimonio
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

                <TestimonyForm testimony={selectedTestimony} isOpen={isOpenFormModal} closeModal={markCloseForm}></TestimonyForm>
                <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md m-4">
                    <div
                        className="px-2 no-scrollbar relative w-full max-w-md text-center overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 items-center">
                        <div className="flex justify-center mb-4 ">
                            <TrashBinIcon className='text-red-500 p-2 rounded-full border-2 border-red-500' width={50} height={50}/>
                        </div>
                        <div>
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                ¿Realmente desea eliminar el testimonio de <strong>{selectedTestimony?.name}</strong>?
                            </h4>
                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                Si haces esto dejarás de ver este testimonio en la pagina principal
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 px-2 mt-6 w-full">
                            <Button variant='danger' onClick={deleteSelectedTestimony} size="sm">
                                Eliminar
                            </Button>
                        </div>
                    </div>
                </Modal>
        </div>
    </>
  );
}
