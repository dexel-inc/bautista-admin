import {TrashBinIcon} from "@/presentation/icons";
import {Subscription} from "@/domain/models/Subscription.ts";
import Toggle from "@/presentation/components/ui/toggle/Toggle.tsx";

interface SubscriptionProps {
  subscription: Subscription;
  toggleSubscription: (subscription: Subscription, isEnabled: boolean) => {};
  openModal: (subscription: Subscription) => void;
}


export default function SubscriptionCard({subscription, toggleSubscription, openModal}: SubscriptionProps) {
  return (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4" scope="row">
                  <div className="flex items-center">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {subscription?.email}
                      </span>
                  </div>
              </td>
              <td scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 dark:text-white">
                  <span
                      className='
                      flex w-full gap-4 items-center font-normal text-left text-gray-500 hover:text-gray-500 hover:bg-gray-500/10 rounded-lg
                  '>
                      <Toggle
                          isActive={subscription.isEnabled ?? false}
                          onChange={(isActive) => toggleSubscription(subscription, isActive)}
                      />
                          <span className="items-center px-2 py-1 font-medium text-theme-sm dark:text-white/90">{subscription.isEnabled ?  "Activo" : "Inactivo"}</span>
                  </span>
              </td>
              <td scope="row" className=" py-4 w-1/12">
                  <div className="flex justify-center w-full">
                      <button type="button" name='btn' onClick={() => {openModal(subscription);}}>
                      <span
                          className="flex w-full gap-4 items-center font-normal text-center text-red-500 hover:text-red-500 hover:bg-red-500/10 text-lg"
                      >
                          <TrashBinIcon />
                      </span>
                      </button>
                  </div>
              </td>
          </tr>
  );
}
