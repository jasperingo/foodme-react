import { useMemo, useCallback } from 'react';
import { MESSAGE } from '../../context/actions/messageActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import MessageRepository from '../../repositories/MessageRepository';
import { useAppContext } from '../contextHook';

export function useMessageChatFetch(userToken) {

  const { 
    message: { 
      messageDispatch,
      message: {
        chat,
        chatID,
        chatError,
        chatLoading
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new MessageRepository(userToken); }, [userToken]);

  const unfetch = useCallback(
    function() { 
      messageDispatch({ type: MESSAGE.UNFETCHED });
    },
    [messageDispatch]
  );

  const onResponse = useCallback(
    function(id) {
      return api.onGetMessageRecipient(function(response) {
        if (response.data) {
          messageDispatch({
            type: MESSAGE.FETCHED,
            payload: { 
              id,
              chat: response.data
            }
          });
        } else {
          messageDispatch({
            type: MESSAGE.ERROR_CHANGED,
            payload: {
              error: NetworkErrorCodes.UNKNOWN_ERROR
            }
          });
        }
      });
    },
    [api, messageDispatch]
  );

  const fetch = useCallback(
    function(id) {
      
      if (chatLoading) return;

      if (!window.navigator.onLine) {
        messageDispatch({
          type: MESSAGE.ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      messageDispatch({ type: MESSAGE.FETCHING });

      api.getMessageRecipient(id);
    },
    [api, chatLoading, messageDispatch]
  );

  return [
    fetch, 
    onResponse,
    chat, 
    chatLoading, 
    chatError,
    chatID,
    unfetch
  ];
}
