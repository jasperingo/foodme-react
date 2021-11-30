
import { Redirect } from "react-router-dom";
import { useUserAuthed } from "../context/AppHooks"

export default function useGuest(url) {
  const auth = useUserAuthed();
  return ()=> !auth ? null : <Redirect to={url} />
}
