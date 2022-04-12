import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import { useAppContext } from "../contextHook";
import { useDeliveryFirmAuthUnset } from "./deliveryFirmAuthStorageHook";

export function useDeliveryFirmLogOut() {

  const { 
    deliveryFirm: { deliveryFirmDispatch } 
  } = useAppContext();

  const unauth = useDeliveryFirmAuthUnset();

  return function() {
    unauth();
    deliveryFirmDispatch({ type: DELIVERY_FIRM.UNAUTHED });
  }
}
