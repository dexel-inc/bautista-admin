import ComponentCard from "@/presentation/components/common/ComponentCard.tsx";
import {MoreDotIcon, NotFoundProfile, PencilIcon, TrashBinIcon} from "@/presentation/icons";
import {Dropdown} from "@/presentation/components/ui/dropdown/Dropdown.tsx";
import {DropdownItem} from "@/presentation/components/ui/dropdown/DropdownItem.tsx";
import {useDropdown} from "@/domain/hooks/useDropdown.ts";
import {Link} from "react-router";
import {Missionary} from "@/domain/models/Missionary.ts";
import Toggle from "@/presentation/components/ui/toggle/Toggle.tsx";

interface MissionaryProps {
  missionary: Missionary;
  toggleMissionary: (missionary: Missionary, isActive: boolean) => {},
  deleteMissionary: (missionary: Missionary) => boolean,
}


export default function MissionaryCard({missionary, toggleMissionary, deleteMissionary}: MissionaryProps) {
  const { isOpenDropdown, toggleDropdown, closeDropdown } = useDropdown();

  return (
      <div className="group relative mt-2">
          <ComponentCard className="group-hover:backdrop-blur-xl h-full">
            <div className="flex flex-col items-center">
              <div className="flex justify-center mb-6">
                {
                  missionary.image ? <img alt="card" className="overflow-hidden rounded-lg object-cover" src={missionary.image}/> : <NotFoundProfile height={160} width={160} />
                }
              </div>
              <div className="flex flex-col items-center text-center w-full">
                <h3 className="font-semibold text-gray-900 text-2xl dark:text-white">{missionary.title}</h3>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="block font-medium text-gray-700 text-sm dark:text-white/80">
                  {missionary?.user?.name}
                </span>
                <span className="block text-gray-500 text-xs dark:text-gray-400">
                  {missionary?.user?.email}
                </span>
              </div>
              <button type="button" name='btn' className="dropdown-toggle" onClick={toggleDropdown}>
                <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
              </button>
              <Dropdown
                  isOpen={isOpenDropdown}
                  onClose={closeDropdown}
                  className="w-40 p-2"
              >
                <DropdownItem
                    className="flex w-full gap-4 items-center font-normal text-left text-gray-500 hover:text-gray-500 hover:bg-gray-500/10 rounded-lg"
                >
                  <Link to={`/missionaries/${missionary?.id}/edit`} className='flex gap-4 w-full items-center'>
                    <PencilIcon />
                    Editar
                  </Link>
                </DropdownItem>
                <DropdownItem
                    tag="simple"
                    className="flex w-full gap-4 items-center font-normal text-left text-red-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                >
                  <button
                      type="button"
                      onClick={() => deleteMissionary(missionary) && closeDropdown()}
                      className='flex gap-4 w-full items-center'>
                    <TrashBinIcon />
                    Eliminar
                  </button>
                </DropdownItem>
                <DropdownItem
                    tag="simple"
                    className="flex w-full gap-4 items-center font-normal text-left text-gray-500 hover:text-gray-500 hover:bg-gray-500/10 rounded-lg"
                >
                  <Toggle
                      isActive={missionary.isEnabled ?? false}
                      onChange={(isActive) => toggleMissionary(missionary, isActive) && closeDropdown()}
                  />
                  <span className="text-theme-xs">{missionary.isEnabled ?  "Activo" : "Inactivo"}</span>
                </DropdownItem>
              </Dropdown>
            </div>
          </ComponentCard>
        </div>
  );
}
