import ComponentCard from "@/presentation/components/common/ComponentCard.tsx";
import {MoreDotIcon, TrashBinIcon} from "@/presentation/icons";
import {Dropdown} from "@/presentation/components/ui/dropdown/Dropdown.tsx";
import {DropdownItem} from "@/presentation/components/ui/dropdown/DropdownItem.tsx";
import {useDropdown} from "@/domain/hooks/useDropdown.ts";
import {Subscription} from "@/domain/models/Subscription.ts";
import Toggle from "@/presentation/components/ui/toggle/Toggle.tsx";

interface SubscriptionProps {
  subscription: Subscription;
  toggleSubscription: (subscription: Subscription, isEnabled: boolean) => {};
  openModal: (subscription: Subscription) => void;
}


export default function SubscriptionCard({subscription, toggleSubscription, openModal}: SubscriptionProps) {
  const { isOpenDropdown, toggleDropdown, closeDropdown } = useDropdown();

  return (
      <div className="group relative mt-2">
        <ComponentCard className="group-hover:backdrop-blur-xl h-full">
          <div className="gap-4 flex justify-between items-center text-center">
            <div className="flex flex-col text-center w-full items-center gap-3">
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {subscription?.email}
                </span>
                <span
                    className={`
                      h-auto w-24 items-center rounded-full px-2 py-1 font-medium text-theme-sm dark:text-white/90
                      ${subscription.isEnabled ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}
                `}>
                  {subscription.isEnabled ? "Activo" : "Inactivo"}
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
                onItemClick={() => {openModal(subscription); closeDropdown()}}
                className="flex w-full gap-4 items-center font-normal text-left text-red-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
            >
                <TrashBinIcon /> Eliminar
            </DropdownItem>
              <DropdownItem
                  tag="simple"
                  className="flex w-full gap-4 items-center font-normal text-left text-gray-500 hover:text-gray-500 hover:bg-gray-500/10 rounded-lg"
              >
                <Toggle
                    isActive={subscription.isEnabled ?? false}
                    onChange={(isActive) => toggleSubscription(subscription, isActive) && closeDropdown()}
                />
                <span className="text-theme-xs">{subscription.isEnabled ?  "Activo" : "Inactivo"}</span>
              </DropdownItem>
            </Dropdown>
          </div>
        </ComponentCard>
      </div>
  );
}
