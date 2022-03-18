
import { MESSAGE } from '../../context/actions/messageActions';
import MessageRepository from '../../repositories/MessageRepository';
import { useAppContext } from '../contextHook';

export function useMessageUnreceivedCountFetch() {

  const { 
    message: { 
      messageDispatch
    } 
  } = useAppContext();

  return function(userToken) {

    const api = new MessageRepository(userToken);

    api.onGetUnreceivedCount((response)=> {
      if (response.data) {
        messageDispatch({
          type: MESSAGE.UNRECEIVED_COUNT_FETCHED,
          payload: { count: response.data.count }
        })
      }
    });

    api.getUnreceivedCount();
  }
}
