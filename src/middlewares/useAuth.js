
import { Redirect } from "react-router-dom";
import { useUserAuthed } from "../context/AppHooks"

export default function useAuth(url) {
  const auth = useUserAuthed();
  return ()=> auth ? null : <Redirect to={url} />
}
