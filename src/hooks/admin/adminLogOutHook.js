import { ADMIN } from "../../context/actions/adminActions";
import { useAppContext } from "../contextHook";
import { useAdminAuthUnset } from "./adminAuthStorageHook";

export function useAdminLogOut() {
  const { 
    admin: { adminDispatch } 
  } = useAppContext();

  const unauth = useAdminAuthUnset();

  return function() {
    unauth();
    adminDispatch({ type: ADMIN.UNAUTHED });
  }
}
