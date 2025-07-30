import { useTestimonies } from "@/domain/hooks/useTestimony.ts";
import TestimonyCard from "@/presentation/components/form/TestimonyCard.tsx";
import Button from "@/presentation/components/ui/button/Button.tsx";
import {Modal} from "@/presentation/components/ui/modal";
import {useModal} from "@/domain/hooks/useModal.ts";
import {useState} from "react";
import {Testimony} from "@/domain/models/Testimony.ts";
import {TrashBinIcon} from "@/presentation/icons";

export default function TestimoniesTable() {
  const { testimonies, loading, deleteTestimony } = useTestimonies();
  const { isOpen, closeModal, openModal } = useModal();
  const [selectedTestimony, setSelectedTestimony] = useState<null|Testimony>(null);

  const markOpen = (testimony: Testimony) => {
    openModal();
    setSelectedTestimony(testimony);
  }

  const deleteSelectedTestimony = () => {
    if(selectedTestimony) {
      deleteTestimony(selectedTestimony.id)
    }

    closeModal();
    setSelectedTestimony(null);
  }

  if (loading) return <p>Cargando testimonios...</p>;

  return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {
          testimonies.map((testimony) => (
              <TestimonyCard openModal={markOpen} testimony={testimony} key={testimony.id} />
          ))
        }

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md m-4">
          <div className="px-2 no-scrollbar relative w-full max-w-md text-center overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 items-center">
            <div className="flex justify-center mb-4 ">
              <TrashBinIcon className='text-red-500 p-2 rounded-full border-2 border-red-500' width={50} height={50} />
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
  );
}
