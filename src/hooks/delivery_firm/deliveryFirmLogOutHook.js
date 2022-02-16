import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import { useAppContext } from "../contextHook";
import { DELIVERY_FIRM_ADMIN_ID, DELIVERY_FIRM_ID, DELIVERY_FIRM_TOKEN } from "./deliveryFirmConstants";

export function useDeliveryFirmLogOut() {

  const { 
    deliveryFirm: { deliveryFirmDispatch } 
  } = useAppContext();

  return ()=> {
    window.localStorage.removeItem(DELIVERY_FIRM_ID);
    window.localStorage.removeItem(DELIVERY_FIRM_TOKEN);
    window.localStorage.removeItem(DELIVERY_FIRM_ADMIN_ID);

    deliveryFirmDispatch({ type: DELIVERY_FIRM.UNAUTHED });
  }

}

