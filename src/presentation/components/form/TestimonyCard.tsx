import ComponentCard from "@/presentation/components/common/ComponentCard.tsx";
import {MoreDotIcon, NotFoundProfile, PencilIcon, TrashBinIcon} from "@/presentation/icons";
import {Dropdown} from "@/presentation/components/ui/dropdown/Dropdown.tsx";
import {DropdownItem} from "@/presentation/components/ui/dropdown/DropdownItem.tsx";
import {Testimony} from "@/domain/models/Testimony.ts";
import {useDropdown} from "@/domain/hooks/useDropdown.ts";
import {Link} from "react-router";
import {useState} from "react";

interface TestimonyProps {
  testimony: Testimony;
  openModal: (testimony: Testimony) => void
}


export default function TestimonyCard({testimony, openModal}: TestimonyProps) {
  const { isOpenDropdown, toggleDropdown, closeDropdown } = useDropdown();
  const [expanded, setExpanded] = useState(false);

  const isLong = testimony.content.length > 255;
  const displayText = expanded ? testimony.content : testimony.content.slice(0, 255);

  return (
      <div className="group relative mt-2">
          <ComponentCard className="relative group-hover:backdrop-blur-xl h-full">
            <div className="absolute shadow-md -top-5 m-auto left-0 text-gray-800 bg-gray-200 right-0 justify-center h-20 w-20 flex overflow-hidden rounded-full items-center self-center">
              {
                testimony.image ? <img alt="card" className="overflow-hidden rounded-lg" src={testimony.image}/> : <NotFoundProfile height={50} width={50} />
              }
            </div>
            <div className="gap-4 justify-between text-center">
              <div className="relative flex justify-end">
                <button className="dropdown-toggle" onClick={toggleDropdown}>
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
                    <Link to={`/testimonies/${testimony?.id}/edit`} className='flex gap-4 w-full items-center'>
                      <PencilIcon />
                      Editar
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                      onItemClick={() => {openModal(testimony); closeDropdown()}}
                      className="flex w-full gap-4 items-center font-normal text-left text-red-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                  >
                    <TrashBinIcon /> Eliminar
                  </DropdownItem>
                </Dropdown>
              </div>
              <div className="mt-10">
                <h4 className="mb-1 font-medium text-gray-800 text-theme-xl dark:text-white/90">{testimony.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {displayText}
                  {isLong && !expanded && "... "}
                  {isLong && (
                      <button
                          onClick={() => setExpanded(!expanded)}
                          className="text-brand-500 hover:underline ml-1"
                      >
                        {expanded ? "ver menos" : "ver más"}
                      </button>
                  )}
                </p>              </div>
            </div>
          </ComponentCard>
        </div>
  );
}
