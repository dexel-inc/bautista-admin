import ComponentCard from "@/presentation/components/common/ComponentCard.tsx";
import {MoreDotIcon, NotFoundProfile, PencilIcon} from "@/presentation/icons";
import {Dropdown} from "@/presentation/components/ui/dropdown/Dropdown.tsx";
import {DropdownItem} from "@/presentation/components/ui/dropdown/DropdownItem.tsx";
import {useDropdown} from "@/domain/hooks/useDropdown.ts";
import {Link} from "react-router";
import {Missionary} from "@/domain/models/Missionary.ts";
import Toggle from "@/presentation/components/ui/toggle/Toggle.tsx";

interface MissionaryProps {
  missionary: Missionary;
  toggleMissionary: (missionary: Missionary, isActive: boolean) => {},
}


export default function MissionaryCard({missionary, toggleMissionary}: MissionaryProps) {
  const { isOpenDropdown, toggleDropdown, closeDropdown } = useDropdown();

  return (
      <div className="group relative mt-2">
          <ComponentCard className="group-hover:backdrop-blur-xl h-full">
            <div>
              {
                missionary.image ? <img alt="card" className="overflow-hidden rounded-lg" src={missionary.image}/> : <NotFoundProfile height={50} width={50} />
              }
            </div>
            <div className="gap-4 flex justify-between items-center text-center">
              <div className="flex text-center w-full justify-center">
                <h4 className="mb-1 font-medium text-gray-800 text-theme-xl dark:text-white/90">{missionary.title}</h4>
                <div className="flex items-center gap-3">
                  <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {missionary?.user?.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {missionary?.user?.email}
                      </span>
                  </div>
                </div>
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
