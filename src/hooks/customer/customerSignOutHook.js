import { CUSTOMER } from "../../context/actions/customerActions";
import { useAppContext } from "../contextHook";
import { useCustomerAuthUnset } from "./customerAuthStorageHook";

export function useCustomerSignOut() {

  const { 
    customer: { dispatch } 
  } = useAppContext();

  const unauth = useCustomerAuthUnset();

  return function() {
    unauth();
    dispatch({ type: CUSTOMER.UNAUTHED });
  }
}
