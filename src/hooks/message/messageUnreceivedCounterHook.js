import { useAppContext } from "../contextHook";

export function useMessageUnreceivedCounter() {

  const { 
    message: { 
      message: {
        unreceivedCount
      }
    } 
  } = useAppContext();

  return unreceivedCount;
}
