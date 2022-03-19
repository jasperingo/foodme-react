import { useMemo, useCallback } from 'react';
import { MESSAGE } from '../../context/actions/messageActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import MessageRepository from '../../repositories/MessageRepository';
import { useAppContext } from '../contextHook';

export function useMessageChatList(userToken) {
  
  const { 
    message: { 
      messageDispatch,
      message: {
        chats,
        chatsLoading,
        chatsError,
        chatsLoaded,
        chatsPage,
        chatsEnded
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return MessageRepository.getInstance(userToken); }, [userToken]);

  const onChatListOpened = useCallback(
    function() { 
      messageDispatch({ 
        type: MESSAGE.UNRECEIVED_COUNT_FETCHED, 
        payload: { count: 0 } 
      }) ;
    },
    [messageDispatch]
  );
  
  const retryFetch = useCallback(
    function() { 
      messageDispatch({ 
        type: MESSAGE.CHAT_LIST_ERROR_CHANGED, 
        payload: { error: null } 
      }) ;
    },
    [messageDispatch]
  );

  const onResponse = useCallback(
    function() {
      return api.onGetMessageRecipients(function(response) {
        if (response.data) {
          messageDispatch({
            type: MESSAGE.CHAT_LIST_FETCHED,
            payload: { 
              list: response.data,
              ended: response.data.length === 0
            }
          });
        } else {
          messageDispatch({
            type: MESSAGE.CHAT_LIST_ERROR_CHANGED,
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
    function() {
      
      if (chatsLoading || chatsError !== null) return;

      if (!window.navigator.onLine) {
        messageDispatch({
          type: MESSAGE.CHAT_LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      messageDispatch({ type: MESSAGE.CHAT_LIST_FETCHING });

      api.getMessageRecipients(chatsPage);
    },
    [api, chatsPage, chatsLoading, chatsError, messageDispatch]
  );

  return [
    fetch, 
    onResponse,
    chats, 
    chatsLoading, 
    chatsError, 
    chatsLoaded, 
    chatsEnded,
    retryFetch,
    onChatListOpened
  ];
}
