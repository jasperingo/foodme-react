import { useMemo, useCallback } from 'react';
import { MESSAGE } from '../../context/actions/messageActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import MessageRepository from '../../repositories/MessageRepository';
import { useAppContext } from '../contextHook';

export function useMessageMessgeList(userToken) {
  
  const { 
    message: { 
      messageDispatch,
      message: {
        messages,
        messagesLoading,
        messagesError,
        messagesLoaded,
        messagesPage,
        messagesEnded
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new MessageRepository(userToken); }, [userToken]);

  const retryFetch = useCallback(
    function() { 
      messageDispatch({ 
        type: MESSAGE.LIST_ERROR_CHANGED, 
        payload: { error: null } 
      }) ;
    },
    [messageDispatch]
  );

  const onResponse = useCallback(
    function() {
      return api.onGetMessages(function(response) {
        if (response.data) {
          messageDispatch({
            type: MESSAGE.LIST_FETCHED,
            payload: { 
              list: response.data,
              ended: response.data.length === 0
            }
          });
        } else {
          messageDispatch({
            type: MESSAGE.LIST_ERROR_CHANGED,
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
    function(ID) {
      
      if (messagesLoading || messagesError !== null) return;

      if (!window.navigator.onLine) {
        messageDispatch({
          type: MESSAGE.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      messageDispatch({ type: MESSAGE.LIST_FETCHING });

      api.getMessages(ID, messagesPage);
    },
    [api, messagesPage, messagesLoading, messagesError, messageDispatch]
  );

  const onSendMessage = useCallback(
    function(content, user_id) {
      messageDispatch({
        type: MESSAGE.SENT,
        payload: {
          id: 0,
          content,
          user_id,
          created_at: (new Date()).toISOString()
        }
      });
    },
    [messageDispatch]
  );

  return [
    fetch, 
    onResponse,
    messages, 
    messagesLoading, 
    messagesError, 
    messagesLoaded, 
    messagesEnded,
    retryFetch,
    onSendMessage
  ];
}
