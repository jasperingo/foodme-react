import { useMemo, useCallback } from 'react';
import { MESSAGE } from '../../context/actions/messageActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import Message from '../../models/Message';
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

  const api = useMemo(function() { return MessageRepository.getInstance(userToken); }, [userToken]);

  const onChatRead = useCallback(
    function() {
      if (chat !== null) {
        messageDispatch({
          type: MESSAGE.CHAT_READ,
          payload: { 
            chatId: chat.id,
            deliveryStatus: Message.DELIVERY_STATUS_DELIVERED
          }
        });
        
        api.updateMessageDeliveryStatus(chatID);
      }
    },
    [chat, chatID, api, messageDispatch]
  );

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
    unfetch,
    onChatRead
  ];
}
