
import { MESSAGE } from '../../context/actions/messageActions';
import MessageRepository from '../../repositories/MessageRepository';
import { useAppContext } from '../contextHook';

export function useMessageFetch() {

  const { 
    message: { 
      messageDispatch
    } 
  } = useAppContext();

  return function(userToken) {

    const api = new MessageRepository(userToken);

    api.onGetMessage((response)=> {
      if (response.data) {
        messageDispatch({
          type: MESSAGE.RECEIVED,
          payload: response.data
        })
      }
    });
  }
}
