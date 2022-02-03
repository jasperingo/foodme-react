import { ADMIN } from "../../context/actions/adminActions";
import { useAppContext } from "../contextHook";
import { ADMIN_ID, ADMIN_TOKEN } from "./adminConstants";

export function useAdminLogOut() {
  const { 
    admin: { adminDispatch } 
  } = useAppContext();

  return ()=> {
    window.localStorage.removeItem(ADMIN_ID);
    window.localStorage.removeItem(ADMIN_TOKEN);

    adminDispatch({ type: ADMIN.UNAUTHED });
  }
}
