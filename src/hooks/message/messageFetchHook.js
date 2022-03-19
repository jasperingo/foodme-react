
import { useCallback } from 'react';
import { MESSAGE } from '../../context/actions/messageActions';
import MessageRepository from '../../repositories/MessageRepository';
import { useAppContext } from '../contextHook';
import { useNotificationCreate } from '../notification/notificationCreateHook';
import { useMessageMemberGet } from './messageMemberGetHook';

export function useMessageFetch() {

  const { 
    message: { 
      messageDispatch
    } 
  } = useAppContext();

  const notify = useNotificationCreate();

  const getMember = useMessageMemberGet();

  return useCallback(function(userToken, userId) {

    const api = MessageRepository.getInstance(userToken);

    api.onGetMessage((response)=> {
      if (response.data) {

        const member = getMember(response.data, userId);

        messageDispatch({
          type: MESSAGE.RECEIVED,
          payload: {
            member,
            userId,
            chat: response.data,
          }
        });

        notify(response.data, member);
      }
    });
  }, [getMember, notify, messageDispatch]);
}
